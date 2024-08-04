import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTransactionLiteDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  userFullName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  bookName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  librarianFullName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  comment?: string;
}
