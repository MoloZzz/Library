import { IsDefined, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({ example: 'Fiction' })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Fictional books' })
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty({ example: 'fiction' })
  @IsDefined()
  @IsString()
  code: string;
}
