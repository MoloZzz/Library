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
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IdEntryDto } from 'src/common/dto/common/id-entry-dto.dto';
import { NameEntryDto } from 'src/common/dto/common/name-entry-dto.dto';
import { CreateBookDto } from 'src/common/dto/books/create-book-dto.dto';
import { Book } from 'src/common/schemas';

@ApiTags('Книги')
@Controller('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiCookieAuth()
  @ApiResponse({ status: 200, description: 'Return all books.' })
  async findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by id' })
  @ApiCookieAuth()
  @ApiResponse({ status: 200, description: 'Return a single book by id.' })
  async findOneById(@Param('id') params: IdEntryDto) {
    return this.service.getOneById(params.id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a book by name' })
  @ApiCookieAuth()
  @ApiResponse({ status: 200, description: 'Return a single book by name.' })
  async findOneByName(@Param('name') params: NameEntryDto) {
    return this.service.getOneByName(params.name);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiCookieAuth()
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  async create(@Body() body: CreateBookDto) {
    return this.service.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by id' })
  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
  })
  async update(@Param('id') params: IdEntryDto, @Body() updateBookDto: Book) {
    return this.service.update(params.id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by id' })
  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted.',
  })
  async delete(@Param('id') params: IdEntryDto) {
    return this.service.delete(params.id);
  }
}
