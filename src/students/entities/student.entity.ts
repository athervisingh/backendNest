// src/students/entities/student.entity.ts
// TypeORM entity — maps directly to the "students" table in PostgreSQL

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('students')
export class Student {
  // ── Primary Key ─────────────────────────────────────────────────────────────
  // UUID auto-generated — safer than sequential integers
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ── Fields ──────────────────────────────────────────────────────────────────
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'int' })
  age: number;

  // ── Timestamps ──────────────────────────────────────────────────────────────
  // TypeORM sets these automatically
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
