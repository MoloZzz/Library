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
} from 'src/common/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { GenresService } from 'src/genres/genres.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: BookGenre.name, schema: BookGenreSchema },
      { name: Genre.name, schema: GenreSchema },
    ]),
  ],
  providers: [BooksService, GenresService],
  controllers: [BooksController],
})
export class BooksModule {}
