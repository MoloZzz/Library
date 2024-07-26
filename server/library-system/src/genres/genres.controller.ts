import { Controller, Get, Param } from '@nestjs/common';
import { GenresService } from './genres.service';
import { ApiOperation, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { CodeEntryDto } from 'src/common/dto/common/code-entry-dto.dto';

@ApiTags('Жанри')
@Controller('genres')
export class GenresController {
  constructor(private readonly service: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Повертає всі жанри' })
  @ApiCookieAuth()
  public async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Повертає жанр по коду' })
  @ApiCookieAuth()
  public async getOneById(@Param() params: CodeEntryDto) {
    return this.service.getOneByCode(params.code);
  }
}
