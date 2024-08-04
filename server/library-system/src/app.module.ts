import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GenresModule } from './genres/genres.module';
import { BooksModule } from './books/books.module';
import { AdminModule } from './admin/admin.module';
import { EmployeesModule } from './employees/employees.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './utils/logger/logger.module';
import { LoggerMiddleware } from './utils/logger/logger-middleware';

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
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
