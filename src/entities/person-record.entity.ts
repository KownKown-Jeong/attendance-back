// src/entities/person-record.entity.ts
// The entity class for the person record table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity({ name: 'person.record' })
export class PersonRecord {
  // Person Record Number
  @PrimaryGeneratedColumn()
  id: number;

  // Student ID
  @Column()
  student_id: number;

  // Record relationship with Student
  @ManyToOne(() => Person)
  student: Person;

  // Teacher ID
  @Column()
  teacher_id: number;

  // Record relationship with Teacher
  @ManyToOne(() => Person)
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