import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateTransactionLiteDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  userFullName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  bookName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  librarianFullName: string;
}
