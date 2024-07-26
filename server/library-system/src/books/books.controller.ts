import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdEntryDto } from 'src/common/dto/id-entry-dto.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Повертає всі книги' })
  @ApiCookieAuth()
  public async getAll() {
    return this.booksService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Повертає книгу по id' })
  @ApiCookieAuth()
  public async getOneById(@Param() params: IdEntryDto) {
    return this.booksService.getOneById(params.id);
  }
}
