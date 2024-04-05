// src/entities/person-record.entity.ts
// The entity class for the person record table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity({ name: 'person.record' })
export class PersonRecord {
  // Person Record Number
  @PrimaryGeneratedColumn()
  id: number;

  // Record relationship with Student
  @Column({ name: 'student_id' })
  studentId: number;
  @ManyToOne(() => Person)
  @JoinColumn({ name: 'student_id' })
  student: Person;

  // Record relationship with Teacher
  @Column({ name: 'teacher_id' })
  teacherId: number;
  @ManyToOne(() => Person)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Person;

  // Record content
  @Column()
  content: string;

  // Record created date
  @Column()
  created_at: Date;

  // Record updated date
  @Column()
  updated_at: Date;

  // Record type
  @Column({
    type: 'enum',
    enum: ['visible', 'invisible'],
  })
  type: 'visible' | 'invisible';
}