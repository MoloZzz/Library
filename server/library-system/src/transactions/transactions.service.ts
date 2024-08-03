import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksService } from 'src/books/books.service';
import { CreateTransactionDto, UpdateTransactionDto } from 'src/common/dto';
import { CreateTransactionLiteDto } from 'src/common/dto/transactions/create-transaction-lite-dto.dto';
import { transactionStatus } from 'src/common/enums';
import { Book, Transaction } from 'src/common/schemas';
import { EmployeesService } from 'src/employees/employees.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    private userService: UsersService,
    private bookService: BooksService,
    private employeeService: EmployeesService,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  async getOneById(id: string) {
    const transaction = await this.transactionModel
      .findById(id)
      .populate('user', 'fullName')
      .populate('book', 'title')
      .exec();

    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }

    return transaction;
  }

  async getAll() {
    return this.transactionModel
      .find()
      .populate('user', 'fullName')
      .populate('book', 'title')
      .exec();
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const { userId, bookId, librarianId, comment } = createTransactionDto;

    const book = await this.bookModel.findById(bookId).exec();
    if (!book) throw new NotFoundException(`Book with ID ${bookId} not found`);
    if (!book.available) throw new BadRequestException('Book is unavailable');

    const createdTransaction = new this.transactionModel({
      user: userId,
      book: bookId,
      librarian: librarianId,
      comment: comment,
      status: 'taken',
      borrowDate: new Date(),
      lastInteractionDate: new Date(),
    });
    book.available = false;
    await book.save();
    return await createdTransaction.save();
  }

  async createLiteTransaction(
    createTransactionLiteDto: CreateTransactionLiteDto,
  ) {
    const { userFullName, bookName, librarianFullName } =
      createTransactionLiteDto;

    const user = await this.userService.findByName(userFullName);
    const book = await this.bookService.findByName(bookName);

    if (!book.available) {
      throw new BadRequestException(`Book "${bookName}" is not available`);
    }

    const employee = await this.employeeService.findByName(librarianFullName);

    const newTransaction = new this.transactionModel({
      user: user._id,
      book: book._id,
      librarian: employee._id,
      borrowDate: new Date(),
      status: 'taken',
      lastInteractionDate: new Date(),
    });

    const savedTransaction = await newTransaction.save();

    book.available = false;
    await book.save();

    return savedTransaction.populate(['book', 'user', 'librarian']);
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const updatedTransaction = await this.transactionModel
      .findByIdAndUpdate(
        id,
        { ...updateTransactionDto, lastInteractionDate: new Date() },
        { new: true },
      )
      .exec();

    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }

    return updatedTransaction;
  }

  async delete(id: string) {
    const result = await this.transactionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return result;
  }

  async updateStatus(id: string, status: transactionStatus) {
    const transaction = await this.transactionModel
      .findByIdAndUpdate(id, {
        status: status,
        lastInteractionDate: new Date(),
      })
      .exec();

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    const bookId = transaction.book.toString();
    if (
      status === transactionStatus.returned ||
      status === transactionStatus.returnedNewOne ||
      status === transactionStatus.writtenOff
    ) {
      await this.bookService.update(bookId, { available: true });
    } else {
      await this.bookService.update(bookId, { available: false });
    }

    return transaction;
  }
}
