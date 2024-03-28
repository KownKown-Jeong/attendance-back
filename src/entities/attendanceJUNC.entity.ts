// src/entities/attendance.entity.ts
// The entity class for the attendance JUNCTION table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AttendanceDate } from './attendance-date.entity';
import { RoleJUNC } from './group-roleJUNCentity';
import { Person } from './person.entity';

@Entity({ name: 'attendanceJUNC' })
export class AttendanceJUNC {
  // Attendance Number
  @PrimaryGeneratedColumn()
  id: number;

  // Person ID
  @Column()
  person_id: number;

  // Attendance relationship with Person
  @ManyToOne(() => Person, person => person.attendances)
  person: Person;

  // RoleJUNC ID
  @Column()
  person_role_id: number;

  // Attendance relationship with RoleJUNC
  @ManyToOne(() => RoleJUNC, roleJUNC => roleJUNC.attendances)
  roleJUNCs: RoleJUNC;

  // Attendance Date ID
  @Column()
  attendance_date_id: number;

  // Attendance relationship with AttendanceDate
  @ManyToOne(() => AttendanceDate, attendanceDate => attendanceDate.attendances)
  attendance_date: AttendanceDate;

  // Status
  @Column({ nullable: true })
  status: string;

  // Entry time
  @Column({ nullable: true })
  entry_time: string;

  // Exit time
  @Column({ nullable: true })
  exit_time: string;
}