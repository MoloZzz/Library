import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdEntryDto } from 'src/common/dto/common/id-entry-dto.dto';

@ApiTags('Транзакції, основний контроллер')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Повертає книгу по id' })
  @ApiCookieAuth()
  public async getOneById(@Param() params: IdEntryDto) {
    return this.service.getOneById(params.id);
  }
}
