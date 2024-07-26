import { IsDefined, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NameEntryDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    name: string;
  }
  