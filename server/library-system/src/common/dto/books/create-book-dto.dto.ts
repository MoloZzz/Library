import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({ example: 'A classic novel by F. Scott Fitzgerald' })
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty({ example: true })
  @IsDefined()
  @IsBoolean()
  available: boolean;

  @ApiProperty({ example: '978-3-16-148410-0' })
  @IsDefined()
  @IsString()
  isbn: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  @IsDefined()
  @IsString()
  author: string;

  @ApiProperty({ example: 'Scribner' })
  @IsDefined()
  @IsString()
  publisher: string;

  @ApiProperty({ example: ['Classic', 'Literature'] })
  @IsArray()
  @IsString({ each: true })
  genres: string[];
}
