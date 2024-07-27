import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdEntryDto } from 'src/common/dto/common/id-entry-dto.dto';
import { NameEntryDto } from 'src/common/dto/common/name-entry-dto.dto';
import { CreateBookDto } from 'src/common/dto/books/create-book-dto.dto';
import { UpdateBookDto } from 'src/common/dto/books/update-book-dto.dto';

@ApiTags('Книги')
@Controller('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiCookieAuth()
  async findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by id' })
  @ApiCookieAuth()
  async findOneById(@Param() params: IdEntryDto) {
    return this.service.getOneById(params.id);
  }

  @Get('/name/:name')
  @ApiOperation({ summary: 'Get a book by name' })
  @ApiCookieAuth()
  async findOneByName(@Param() params: NameEntryDto) {
    return this.service.getOneByName(params.name);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiCookieAuth()
  async create(@Body() body: CreateBookDto) {
    return this.service.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by id' })
  @ApiCookieAuth()
  async update(@Param() params: IdEntryDto, @Body() body: UpdateBookDto) {
    return this.service.update(params.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by id' })
  @ApiCookieAuth()
  async delete(@Param() params: IdEntryDto) {
    return this.service.delete(params.id);
  }
}
