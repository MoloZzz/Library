import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
