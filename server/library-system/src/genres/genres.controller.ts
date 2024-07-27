import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import {
  ApiOperation,
  ApiCookieAuth,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { CodeEntryDto, CreateGenreDto, UpdateGenreDto } from 'src/common/dto';

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

  @Get('/:code')
  @ApiOperation({ summary: 'Повертає жанр по коду' })
  @ApiCookieAuth()
  public async getOneByCode(@Param() params: CodeEntryDto) {
    return this.service.getOneByCode(params.code);
  }

  @Post()
  @ApiOperation({ summary: 'Створює новий жанр' })
  @ApiResponse({ status: 201, description: 'Жанр успішно створено.' })
  @ApiCookieAuth()
  public async create(@Body() createGenreDto: CreateGenreDto) {
    return this.service.create(createGenreDto);
  }

  @Put('/:code')
  @ApiOperation({ summary: 'Оновлює жанр по коду' })
  @ApiResponse({ status: 200, description: 'Жанр успішно оновлено.' })
  @ApiCookieAuth()
  public async update(
    @Param() params: CodeEntryDto,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.service.update(params.code, updateGenreDto);
  }

  @Delete('/:code')
  @ApiOperation({ summary: 'Видаляє жанр по коду' })
  @ApiResponse({ status: 200, description: 'Жанр успішно видалено.' })
  @ApiCookieAuth()
  public async delete(@Param() params: CodeEntryDto) {
    return this.service.delete(params.code);
  }
}
