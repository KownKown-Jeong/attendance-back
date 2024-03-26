// src/entities/attendance-date.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'attendance_schema' })
export class AttendanceDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  is_regular: boolean;
}