// src/main.ts
// Application bootstrap — sets up CORS, validation pipe, and starts the server

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ── Global Validation Pipe ──────────────────────────────────────────────────
  // Automatically validates all incoming request bodies using class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Strip unknown properties from body
      forbidNonWhitelisted: true, // Throw error if unknown properties are sent
      transform: true,           // Auto-convert types (e.g. string "21" → number 21)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ── CORS ────────────────────────────────────────────────────────────────────
  // Allow requests from your React frontend
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'https://*.vercel.app',
      'https://*.netlify.app',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ── Global prefix ───────────────────────────────────────────────────────────
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`\n🚀 Students API is running on: http://localhost:${port}/api`);
  console.log(`📋 Students endpoint: http://localhost:${port}/api/students\n`);
}

bootstrap();
