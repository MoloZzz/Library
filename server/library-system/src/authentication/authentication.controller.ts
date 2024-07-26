import { Controller } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Робота з авторизацією')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}
}
