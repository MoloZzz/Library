import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto, UpdateTransactionDto } from 'src/common/dto';
import { Book, Transaction } from 'src/common/schemas';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  async getOneById(id: string) {
    const transaction = await this.transactionModel
      .findById(id)
      .populate('user', 'FIO')
      .populate('book', 'name')
      .populate('employee', 'FIO')
      .exec();

    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }

    return transaction;
  }

  async getAll() {
    return this.transactionModel
      .find()
      .populate('user', 'FIO')
      .populate('book', 'name')
      .populate('employee', 'FIO')
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

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const updatedTransaction = await this.transactionModel
      .findByIdAndUpdate(id, updateTransactionDto, { new: true })
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
}
