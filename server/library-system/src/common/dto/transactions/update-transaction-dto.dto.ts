import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateTransactionDto {
  @ApiProperty({ description: 'Статус транзакції' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'Коментар' })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ description: 'Дата повернення книги' })
  @IsDate()
  @IsOptional()
  returnDate?: Date;
}
