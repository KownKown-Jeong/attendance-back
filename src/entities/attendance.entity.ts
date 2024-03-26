// src/entities/attendance.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { PersonRole } from './person-role.entity';
import { AttendanceDate } from './attendance-date.entity';

@Entity({ schema: 'attendance_schema' })
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  person_id: number;

  @ManyToOne(() => Person)
  person: Person;

  @Column()
  person_role_id: number;

  @ManyToOne(() => PersonRole)
  person_role: PersonRole;

  @Column()
  attendance_date_id: number;

  @ManyToOne(() => AttendanceDate)
  attendance_date: AttendanceDate;

  @Column()
  status: string;

  @Column()
  entry_time: string;

  @Column()
  exit_time: string;
}