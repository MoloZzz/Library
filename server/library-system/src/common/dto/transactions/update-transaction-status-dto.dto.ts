import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { transactionStatus } from 'src/common/enums';

export class UpdateTransactionStatusDto {
  @ApiProperty({ description: 'Статус транзакції' })
  @IsString()
  @IsOptional()
  status?: transactionStatus;
}
