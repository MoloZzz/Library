import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/common/dto/users/create-user-dto.dto';
import { UpdateUserDto } from 'src/common/dto/users/update-user-dto.dto';

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiCookieAuth()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiCookieAuth()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user by id' })
  @ApiCookieAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one user by id' })
  @ApiCookieAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one user by id' })
  @ApiCookieAuth()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
