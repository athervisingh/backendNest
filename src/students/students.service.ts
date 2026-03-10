// src/students/students.service.ts
// Business logic layer — handles all database operations via TypeORM repository

import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    // TypeORM injects the Student repository automatically
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  // ── CREATE ──────────────────────────────────────────────────────────────────
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    // Check if email already exists
    const existing = await this.studentsRepository.findOne({
      where: { email: createStudentDto.email.toLowerCase() },
    });

    if (existing) {
      throw new ConflictException(
        `A student with email "${createStudentDto.email}" already exists.`,
      );
    }

    try {
      const student = this.studentsRepository.create({
        ...createStudentDto,
        email: createStudentDto.email.toLowerCase(),
        name: createStudentDto.name.trim(),
      });

      return await this.studentsRepository.save(student);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create student.');
    }
  }

  // ── READ ALL ─────────────────────────────────────────────────────────────────
  async findAll(search?: string): Promise<Student[]> {
    const query = this.studentsRepository.createQueryBuilder('student');

    // Optional search filter by name or email
    if (search && search.trim()) {
      query.where(
        'LOWER(student.name) LIKE :search OR LOWER(student.email) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    return query.orderBy('student.createdAt', 'DESC').getMany();
  }

  // ── READ ONE ─────────────────────────────────────────────────────────────────
  async findOne(id: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found.`);
    }

    return student;
  }

  // ── UPDATE ──────────────────────────────────────────────────────────────────
  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    const dto = updateStudentDto as any;

    if (dto.email && dto.email.toLowerCase() !== student.email) {
      const emailTaken = await this.studentsRepository.findOne({
        where: { email: dto.email.toLowerCase() },
      });

      if (emailTaken) {
        throw new ConflictException(
          `A student with email "${dto.email}" already exists.`,
        );
      }
    }

    const updated = this.studentsRepository.merge(student, {
      ...dto,
      ...(dto.email && { email: dto.email.toLowerCase() }),
      ...(dto.name  && { name: dto.name.trim() }),
    });

    return this.studentsRepository.save(updated);
  }

  // ── DELETE ──────────────────────────────────────────────────────────────────
  async remove(id: string): Promise<{ message: string }> {
    const student = await this.findOne(id); // throws 404 if not found
    await this.studentsRepository.remove(student);
    return { message: `Student "${student.name}" has been deleted successfully.` };
  }
}