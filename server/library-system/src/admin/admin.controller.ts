import { Controller } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Адмін контроллер')
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}
}
