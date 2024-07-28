import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'ID книги' })
  @IsString()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty({ description: 'ID користувача' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Коментар' })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ description: 'Бібліотекар' })
  @IsString()
  @IsNotEmpty()
  librarianId: string;
}
