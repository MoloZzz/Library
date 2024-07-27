import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { ApiOperation, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateEmployeeDto,
  CreateEmployeeFromUserDto,
  IdEntryDto,
  UpdateEmployeeDto,
} from 'src/common/dto';

@ApiTags('Робітники')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Post('from-user/:userId')
  @ApiOperation({ summary: 'Create new employee from exists user' })
  @ApiCookieAuth()
  async createFromUser(@Body() body: CreateEmployeeFromUserDto) {
    return this.service.createFromUser(body);
  }

  @Post()
  @ApiOperation({ summary: 'Create new employee' })
  @ApiCookieAuth()
  async create(@Body() body: CreateEmployeeDto) {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiCookieAuth()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one employee by id' })
  @ApiCookieAuth()
  async findOne(@Param() params: IdEntryDto) {
    return this.service.findOne(params.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one employee by id' })
  @ApiCookieAuth()
  async update(@Param() params: IdEntryDto, @Body() body: UpdateEmployeeDto) {
    return this.service.update(params.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one employee by id' })
  @ApiCookieAuth()
  async remove(@Param() params: IdEntryDto) {
    return this.service.remove(params.id);
  }
}
