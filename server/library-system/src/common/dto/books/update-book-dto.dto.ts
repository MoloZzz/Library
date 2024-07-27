import { IsOptional, IsString, IsBoolean, IsArray } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateBookDto {
    @ApiProperty({ example: 'The Great Gatsby' })
    @IsOptional()
    @IsString()
    title?: string;
  
    @ApiProperty({ example: 'A classic novel by F. Scott Fitzgerald' })
    @IsOptional()
    @IsString()
    description?: string;
  
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    available?: boolean;
  
    @ApiProperty({ example: '978-3-16-148410-0' })
    @IsOptional()
    @IsString()
    isbn?: string;
  
    @ApiProperty({ example: 'F. Scott Fitzgerald' })
    @IsOptional()
    @IsString()
    author?: string;
  
    @ApiProperty({ example: 'Scribner' })
    @IsOptional()
    @IsString()
    publisher?: string;
  
    @ApiProperty({ example: ['Classic', 'Literature'] })
    @IsArray()
    @IsString({ each: true })
    genres?: string[];
  }