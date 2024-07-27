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
import { CreateEmployeeDto } from 'src/common/dto/employees/create-employee-dto.dto';
import { UpdateEmployeeDto } from 'src/common/dto/employees/update-employee-dto.dto';
import { CreateEmployeeFromUserDto } from 'src/common/dto/employees/create-employee-from-user-dto.dto';

@ApiTags('Робітники')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Post('from-user/:userId')
  @ApiOperation({ summary: 'Create new employee from exists user' })
  @ApiCookieAuth()
  createFromUser(
    @Param('userId') userId: string,
    @Body() createEmployeeDto: CreateEmployeeFromUserDto,
  ) {
    return this.service.createFromUser(userId, createEmployeeDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create new employee' })
  @ApiCookieAuth()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.service.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiCookieAuth()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one employee by id' })
  @ApiCookieAuth()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one employee by id' })
  @ApiCookieAuth()
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.service.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one employee by id' })
  @ApiCookieAuth()
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
