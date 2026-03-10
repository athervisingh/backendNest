// src/students/students.module.ts
// Feature module — registers the Student entity, controller, and service

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';

@Module({
  imports: [
    // Register Student entity so TypeORM can inject its repository
    TypeOrmModule.forFeature([Student]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
