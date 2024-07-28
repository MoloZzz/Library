import { Controller } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth controller')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}
}
