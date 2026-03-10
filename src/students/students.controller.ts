// src/students/students.controller.ts
// Controller layer — maps HTTP routes to service methods
//
// Base URL: /api/students
//
// GET    /api/students          → findAll (optional ?search= query param)
// GET    /api/students/:id      → findOne
// POST   /api/students          → create
// PATCH  /api/students/:id      → update
// DELETE /api/students/:id      → remove

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // ── POST /api/students ───────────────────────────────────────────────────────
  // Create a new student
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  // ── GET /api/students ────────────────────────────────────────────────────────
  // Get all students (optional: ?search=arjun)
  @Get()
  findAll(@Query('search') search?: string) {
    return this.studentsService.findAll(search);
  }

  // ── GET /api/students/:id ────────────────────────────────────────────────────
  // Get a single student by UUID
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.findOne(id);
  }

  // ── PATCH /api/students/:id ──────────────────────────────────────────────────
  // Update one or more fields of a student
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  // ── DELETE /api/students/:id ─────────────────────────────────────────────────
  // Delete a student by UUID
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.remove(id);
  }
}
