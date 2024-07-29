import { IsDefined, IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class IdEntryDto {
  @ApiProperty()
  @IsDefined()
  @Type(() => String)
  @IsString()
  id: string;
}
