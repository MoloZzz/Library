import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class checkReferencesDto {
  @ApiProperty({ description: 'ID книги' })
  @IsString()
  @IsNotEmpty()
  bookId?: string;

  @ApiProperty({ description: 'ID користувача' })
  @IsString()
  @IsNotEmpty()
  userId?: string;

  @ApiProperty({ description: 'ID працівника' })
  @IsString()
  @IsNotEmpty()
  librarianId?: string;
}
