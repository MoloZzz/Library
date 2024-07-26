import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdEntryDto } from 'src/common/dto/common/id-entry-dto.dto';
import { NameEntryDto } from 'src/common/dto/common/name-entry-dto.dto';

@ApiTags('Книги')
@Controller('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Повертає всі книги' })
  @ApiCookieAuth()
  public async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Повертає книгу по id' })
  @ApiCookieAuth()
  public async getOneById(@Param() params: IdEntryDto) {
    return this.service.getOneById(params.id);
  }

  @Get('/:name')
  @ApiOperation({ summary: 'Повертає книгу по назві' })
  @ApiCookieAuth()
  public async getOneByName(@Param() params: NameEntryDto) {
    return this.service.getOneByName(params.name);
  }
}
