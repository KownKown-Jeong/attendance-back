// src/entities/person-secret-record.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity({ schema: 'profile_schema' })
export class PersonSecretRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @ManyToOne(() => Person)
  student: Person;

  @Column()
  teacher_id: number;

  @ManyToOne(() => Person)
  teacher: Person;

  @Column()
  content: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  is_visible_to_parent: boolean;

  @Column()
  is_visible_to_me: boolean;
}