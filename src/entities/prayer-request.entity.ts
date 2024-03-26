// src/entities/prayer-request.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity({ schema: 'prayer_schema' })
export class PrayerRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requester_id: number;

  @ManyToOne(() => Person)
  requester: Person;

  @Column()
  requestee_id: number;

  @ManyToOne(() => Person)
  requestee: Person;

  @Column()
  requestee_type: string;

  @Column()
  prayer_subject_id: number;

  @ManyToOne(() => Person)
  prayer_subject: Person;

  @Column()
  content: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;
}