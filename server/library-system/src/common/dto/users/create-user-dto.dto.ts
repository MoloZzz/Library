import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  fullName: string;
  @ApiProperty()
  @IsDefined()
  @IsString()
  phone: string;
  @ApiProperty()
  @IsDefined()
  @IsString()
  formular: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;
}
