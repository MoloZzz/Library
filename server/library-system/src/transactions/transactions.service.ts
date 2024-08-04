import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksService } from 'src/books/books.service';
import {
  checkReferencesDto,
  CreateTransactionDto,
  CreateTransactionLiteDto,
  UpdateTransactionDto,
} from 'src/common/dto';
import { transactionStatus } from 'src/common/enums';
import { Book, Employee, Transaction, User } from 'src/common/schemas';
import { EmployeesService } from 'src/employees/employees.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    private userService: UsersService,
    private bookService: BooksService,
    private employeeService: EmployeesService,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
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

  private async create(
    userId: string,
    bookId: string,
    librarianId: string,
    comment: string,
  ) {
    const createdTransaction = new this.transactionModel({
      user: userId,
      book: bookId,
      librarian: librarianId,
      comment: comment,
      status: 'taken',
      borrowDate: new Date(),
      lastInteractionDate: new Date(),
    });
    return await createdTransaction.save();
  }

  async createByIds(transaction: CreateTransactionDto) {
    const { userId, bookId, librarianId, comment } = transaction;
    const book = await this.bookService.findById(bookId);
    await this.bookService.markBookAsUnavailable(book);
    return (await this.create(userId, bookId, librarianId, comment)).populate([
      'book',
      'user',
      'librarian',
    ]);
  }

  async createByNames(transaction: CreateTransactionLiteDto) {
    const { userFullName, bookName, librarianFullName, comment } = transaction;
    const user: User = await this.userService.findByName(userFullName);
    const book: Book = await this.bookService.findByName(bookName);
    await this.bookService.markBookAsUnavailable(book);
    const librarian: Employee =
      await this.employeeService.findByName(librarianFullName);
    return (
      await this.create(
        user._id as string,
        book._id as string,
        librarian._id as string,
        comment,
      )
    ).populate(['book', 'user', 'librarian']);
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

  async checkReferences(ids: checkReferencesDto): Promise<boolean> {
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
  //returns transaction by(or) userId, bookId, librarianId
  async findReferences(
    ids: checkReferencesDto,
  ): Promise<Transaction | undefined> {
    const query: any = {};
    if (ids.bookId) {
      query.book = ids.bookId;
    }
    if (ids.userId) {
      query.user = ids.userId;
    }
    if (ids.librarianId) {
      query.librarian = ids.librarianId;
    }
    if (Object.keys(query).length === 0) {
      return undefined;
    }
    const transactions = await this.transactionModel.find(query).exec();
    if (transactions.length > 0) {
      return transactions[0];
    }
    return undefined;
  }
}
