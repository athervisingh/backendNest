// src/students/dto/update-student.dto.ts
// All fields are optional for PATCH requests — no external dependency needed

import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @MinLength(2, { message: 'Name must be at least 2 characters.' })
  @MaxLength(100, { message: 'Name cannot exceed 100 characters.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email?: string;

  @IsOptional()
  @IsInt({ message: 'Age must be a whole number.' })
  @Min(5, { message: 'Age must be at least 5.' })
  @Max(100, { message: 'Age cannot exceed 100.' })
  age?: number;
}