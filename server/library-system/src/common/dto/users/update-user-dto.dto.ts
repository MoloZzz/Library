import { IsString, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  fullName?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  formular?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;
}
