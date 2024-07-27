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
  password: string;
}
