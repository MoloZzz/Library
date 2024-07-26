import { IsDefined, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdEntryDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  id: number;
}
