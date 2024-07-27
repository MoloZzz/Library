import { IsString, IsNotEmpty, IsEmail } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  formular?: string; // Номер формуляра

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  position: string; // Посада

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}
