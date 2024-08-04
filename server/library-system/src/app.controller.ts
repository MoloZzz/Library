import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { LoggedGuard } from './utils/guards/logged.guard';

@ApiTags('Library check API')
@Controller()
export class AppController {
  @Get('ping')
  @ApiOperation({ summary: 'Check the availability of the service' })
  getHello(): string {
    return 'pong';
  }

  @Get('protected')
  @UseGuards(LoggedGuard)
  @ApiOperation({ summary: 'Guarded endpoint test' })
  @ApiCookieAuth()
  guardedRoute() {
    return 'Guarded route';
  }
}
