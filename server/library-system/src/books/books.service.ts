import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from 'sequelize';
import {
  checkReferencesDto,
  CreateBookDto,
  UpdateBookDto,
} from 'src/common/dto';
import { Book, BookGenre } from 'src/common/schemas';
import { GenresService } from 'src/genres/genres.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(BookGenre.name) private bookGenreModel: Model<BookGenre>,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private readonly genresService: GenresService,
  ) {}

  async getAll() {
    const books = await this.bookModel.find().exec();
    return Promise.all(
      books.map(async (book) => {
        const genres = await this.genresService.getGenreCodesByBookId(book.id);
        return {
          ...book.toObject(),
          genres,
        };
      }),
    );
  }

  async getOneById(id: string) {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new BadRequestException(`Book with id ${id} not found`);
    }
    const genres = await this.genresService.getGenreCodesByBookId(id);
    return {
      ...book.toObject(),
      genres,
    };
  }

  async getOneByName(name: string) {
    const book = await this.bookModel.findOne({ title: name }).exec();
    if (!book) {
      throw new BadRequestException(`Book with title ${name} not found`);
    }
    const genres = await this.genresService.getGenreCodesByBookId(book.id);
    return {
      ...book.toObject(),
      genres,
    };
  }

  async create(createBookDto: CreateBookDto) {
    const createdBook = new this.bookModel(createBookDto);
    const savedBook = await createdBook.save();
    const bookGenres = await Promise.all(
      createBookDto.genres.map(async (code) => {
        const genre = await this.genresService.getOneByCode(code);
        if (!genre) {
          throw new BadRequestException(`Genre with code ${code} not found`);
        }
        return {
          book: savedBook._id,
          genre: genre._id,
        };
      }),
    );
    await this.bookGenreModel.insertMany(bookGenres);

    return savedBook;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();

    if (!updatedBook) {
      throw new BadRequestException(`Book with id ${id} not found`);
    }
    if (updateBookDto.genres) {
      await this.bookGenreModel.deleteMany({ book: id }).exec();
      const bookGenres = await Promise.all(
        updateBookDto.genres.map(async (code) => {
          const genre = await this.genresService.getOneByCode(code);
          if (!genre) {
            throw new BadRequestException(`Genre with code ${code} not found`);
          }
          return {
            book: id,
            genre: genre._id,
          };
        }),
      );
      await this.bookGenreModel.insertMany(bookGenres);
    }
    const genres = await this.genresService.getGenreCodesByBookId(
      updatedBook.id,
    );
    return { ...updatedBook.toObject(), genres };
  }

  async delete(id: string) {
    if (!this.checkInTransactionReferences({ bookId: id })) {
      return this.bookModel.findByIdAndDelete(id).exec();
    } else {
      throw new BadRequestException(
        'This book is a dependency in another entry. Call the `/transaction/by-book-id` endpoint for more information',
      );
    }
  }

  async findByName(title: string): Promise<Book> {
    const book = await this.bookModel.findOne({ title }).exec();
    if (!book) {
      throw new NotFoundException(`Book with title ${title} not found`);
    }
    return book;
  }

  async findById(bookId: string): Promise<Book> {
    const book = await this.bookModel.findById(bookId).exec();
    if (!book) throw new NotFoundException(`Book with ID ${bookId} not found`);
    return book;
  }

  async markBookAsUnavailable(book: Book): Promise<Book> {
    if (!book.available) throw new BadRequestException('Book is unavailable');
    book.available = false;
    return book.save();
  }

  private async checkInTransactionReferences(
    ids: checkReferencesDto,
  ): Promise<boolean> {
    const query: any = {};
    if (ids.bookId) {
      query.book = ids.bookId;
    } else if (ids.userId) {
      query.user = ids.userId;
    } else if (ids.librarianId) {
      query.librarian = ids.librarianId;
    }
    const transaction = await this.transactionModel.findOne(query).exec();
    return transaction ? true : false;
  }
}
