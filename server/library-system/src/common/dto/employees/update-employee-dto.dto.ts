import {
  IsString,
  IsOptional,
  IsObject,
  IsNotEmpty,
  IsDate,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserDto } from '../users/update-user-dto.dto';

export class UpdateEmployeeDto {
  @ApiProperty()
  @IsOptional()
  @IsObject()
  user?: UpdateUserDto;

  @ApiProperty({
    description: 'Position of the employee',
    example: 'Librarist',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  position?: string;

  @ApiProperty({
    description: 'Employment date of the employee',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  employmentDate?: Date;

  @ApiProperty({
    description: 'Role of the employee',
    example: 'USER',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  role?: string;

  @ApiProperty({
    description: 'Password of the employee',
    example: 'password123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;
}
