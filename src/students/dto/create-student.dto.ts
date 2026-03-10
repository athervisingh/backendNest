// src/students/dto/create-student.dto.ts
// Data Transfer Object for creating a student
// class-validator decorators enforce rules before the request reaches the service

import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  @MinLength(2, { message: 'Name must be at least 2 characters.' })
  @MaxLength(100, { message: 'Name cannot exceed 100 characters.' })
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsInt({ message: 'Age must be a whole number.' })
  @Min(5, { message: 'Age must be at least 5.' })
  @Max(100, { message: 'Age cannot exceed 100.' })
  age: number;
}
