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

@ApiTags('Genres CRUD API')
@Controller('genres')
export class GenresController {
  constructor(private readonly service: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all genres' })
  @ApiCookieAuth()
  public async getAll() {
    return this.service.getAll();
  }

  @Get('/:code')
  @ApiOperation({ summary: 'Retieve one genre by code' })
  @ApiCookieAuth()
  public async getOneByCode(@Param() params: CodeEntryDto) {
    return this.service.getOneByCode(params.code);
  }

  @Post()
  @ApiOperation({ summary: 'Create new genre' })
  @ApiCookieAuth()
  public async create(@Body() createGenreDto: CreateGenreDto) {
    return this.service.create(createGenreDto);
  }

  @Put('/:code')
  @ApiOperation({ summary: 'Update genre by code' })
  @ApiCookieAuth()
  public async update(
    @Param() params: CodeEntryDto,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.service.update(params.code, updateGenreDto);
  }

  @Delete('/:code')
  @ApiOperation({ summary: 'Delete genre by code' })
  @ApiCookieAuth()
  public async delete(@Param() params: CodeEntryDto) {
    return this.service.delete(params.code);
  }
}
