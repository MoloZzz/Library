import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { loginDto } from 'src/common/dto/users/login.dto';

@ApiTags('Auth controller')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('login')
  async login(@Body() body: loginDto) {
    const user = await this.service.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.service.login(user);
  }
}
