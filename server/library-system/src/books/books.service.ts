import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from 'src/common/dto/books/create-book-dto.dto';
import { Book, BookGenre, Genre } from 'src/common/schemas';
import { GenresService } from 'src/genres/genres.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(BookGenre.name) private bookGenreModel: Model<BookGenre>,
    private genresService: GenresService, 
  ) {}

  async getAll() {
    return this.bookModel.find().exec();
  }

  async getOneById(id: string) {
    return this.bookModel.findById(id).exec();
  }

  async getOneByName(name: string) {
    return this.bookModel.findOne({ title: name }).exec();
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

  async update(id: string, updateBookDto: Book) {
    return this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
