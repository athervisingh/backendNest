// src/app.module.ts
// Root module — wires together ConfigModule, TypeORM (PostgreSQL), and StudentsModule

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { Student } from './students/entities/student.entity';

@Module({
  imports: [
    // ── Environment Variables ──────────────────────────────────────────────────
    // Makes process.env available everywhere via ConfigService
    ConfigModule.forRoot({
      isGlobal: true,       // No need to import in every module
      envFilePath: '.env',
    }),

    // ── PostgreSQL Database ────────────────────────────────────────────────────
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        // Use DATABASE_URL (Supabase) if available, otherwise use individual vars
        url: config.get<string>('DATABASE_URL') || undefined,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME', 'students_db'),
        entities: [Student],
        synchronize: true,   // Auto-creates/updates tables — disable in prod if needed
        ssl: config.get<string>('DATABASE_URL')
          ? { rejectUnauthorized: false }  // Required for Supabase
          : false,
        logging: config.get<string>('NODE_ENV') !== 'production',
      }),
    }),

    // ── Feature Modules ────────────────────────────────────────────────────────
    StudentsModule,
  ],
})
export class AppModule {}
