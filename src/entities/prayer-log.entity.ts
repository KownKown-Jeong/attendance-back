// src/entities/prayer-log.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PrayerRequest } from './prayer-request.entity';
import { Person } from './person.entity';

@Entity({ schema: 'prayer_schema' })
export class PrayerLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prayer_request_id: number;

  @ManyToOne(() => PrayerRequest)
  prayer_request: PrayerRequest;

  @Column()
  person_id: number;

  @ManyToOne(() => Person)
  person: Person;

  @Column()
  prayer_date: Date;
}