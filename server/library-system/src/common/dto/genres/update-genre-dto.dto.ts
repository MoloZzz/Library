import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGenreDto {
  @ApiProperty({ example: 'Fiction' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Fictional books' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'fiction' })
  @IsOptional()
  @IsString()
  code?: string;
}
