import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GenresModule } from './genres/genres.module';
import { BooksModule } from './books/books.module';
import { AdminModule } from './admin/admin.module';
import { EmployeesModule } from './employees/employees.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    GenresModule,
    BooksModule,
    AdminModule,
    EmployeesModule,
    TransactionsModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
