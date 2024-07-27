import { IsString, IsOptional, IsEmail } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  fullName?: string; // ПІБ працівника

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  formNumber?: string; // Номер формуляра

  @ApiProperty()
  @IsString()
  @IsOptional()
  position?: string; // Посада

  @ApiProperty()
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;
}
