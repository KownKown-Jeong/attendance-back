// src/entities/attendance-date.entity.ts
// The entity class for the attendance_date table
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AttendanceJUNC } from './attendanceJUNC.entity';

@Entity({ name: 'attendance.date' })
export class AttendanceDate {
  // Attendance Date Number
  @PrimaryGeneratedColumn()
  id: number;

  // Date
  @Column()
  date: Date;

  // Is it a regular date?
  @Column()
  is_regular: boolean;

  // Date description
  @Column({ nullable: true })
  description: string;

  // AttendanceDate relationship with Attendance, nullable
  @OneToMany(() => AttendanceJUNC, attendanceJUNC => attendanceJUNC.attendance_date, { nullable: true })
  attendances: AttendanceJUNC[];

}