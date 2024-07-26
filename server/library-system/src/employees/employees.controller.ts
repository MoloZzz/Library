import { Controller, Get, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { ApiOperation, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { IdEntryDto } from 'src/common/dto/common/id-entry-dto.dto';
import { NameEntryDto } from 'src/common/dto/common/name-entry-dto.dto';

@ApiTags('Робітники')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Get()
  @ApiOperation({ summary: 'Повертає всі записи робітників' })
  @ApiCookieAuth()
  public async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Повертає робітника по id' })
  @ApiCookieAuth()
  public async getOneById(@Param() params: IdEntryDto) {
    return this.service.getOneById(params.id);
  }

  @Get('/:name')
  @ApiOperation({ summary: 'Повертає робітника по ФІО' })
  @ApiCookieAuth()
  public async getOneByName(@Param() params: NameEntryDto) {
    return this.service.getOneByName(params.name);
  }
}
