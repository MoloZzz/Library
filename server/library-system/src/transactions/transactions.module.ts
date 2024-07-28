import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Book,
  BookGenre,
  BookGenreSchema,
  BookSchema,
  Employee,
  EmployeeSchema,
  Genre,
  GenreSchema,
  Transaction,
  TransactionSchema,
  User,
  UserSchema,
} from 'src/common/schemas';
import { EmployeesService } from 'src/employees/employees.service';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';
import { GenresService } from 'src/genres/genres.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Book.name, schema: BookSchema },
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: BookGenre.name, schema: BookGenreSchema },
      { name: Genre.name, schema: GenreSchema },
    ]),
  ],
  providers: [
    TransactionsService,
    EmployeesService,
    UsersService,
    BooksService,
    GenresService,
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
