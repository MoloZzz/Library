import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeFromUserDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  userId: string; // ID користувача

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  position: string; // Посада

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
