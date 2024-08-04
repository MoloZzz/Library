import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import {
  Book,
  BookGenre,
  BookGenreSchema,
  BookSchema,
  Genre,
  GenreSchema,
  Transaction,
  TransactionSchema,
} from 'src/common/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { GenresService } from 'src/genres/genres.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: BookGenre.name, schema: BookGenreSchema },
      { name: Genre.name, schema: GenreSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [BooksService, GenresService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
