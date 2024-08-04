import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateTransactionDto,
  CreateTransactionLiteDto,
  IdEntryDto,
  UpdateTransactionDto,
  UpdateTransactionStatusDto,
} from 'src/common/dto';
import { transactionStatus } from 'src/common/enums';

@ApiTags('Transactions CRUD API')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve transaction by id' })
  @ApiCookieAuth()
  public async getOneById(@Param() params: IdEntryDto) {
    return this.service.getOneById(params.id);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all transactions' })
  @ApiCookieAuth()
  public async getAll() {
    return this.service.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiCookieAuth()
  public async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.service.createByIds(createTransactionDto);
  }

  @Post('/create-lite')
  @ApiOperation({ summary: 'Create a new transaction lite' })
  @ApiCookieAuth()
  public async createLiteTransaction(
    @Body() createTransactionLiteDto: CreateTransactionLiteDto,
  ) {
    return this.service.createByNames(createTransactionLiteDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiCookieAuth()
  public async update(
    @Param() params: IdEntryDto,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.service.update(params.id, updateTransactionDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiCookieAuth()
  public async delete(@Param() params: IdEntryDto) {
    return this.service.delete(params.id);
  }

  @Put('/update-status/:id')
  @ApiOperation({ summary: 'Update transaction status by id' })
  @ApiCookieAuth()
  public async updateStatus(
    @Param() params: IdEntryDto,
    @Body() body: UpdateTransactionStatusDto,
  ) {
    return this.service.updateStatus(
      params.id,
      body.status as transactionStatus,
    );
  }
}
