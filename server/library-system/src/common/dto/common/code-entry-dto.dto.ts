import { IsDefined, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CodeEntryDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    code: string;
  }