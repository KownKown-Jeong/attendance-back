// src/entities/person-tag.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { Tag } from './tag.entity';

@Entity({ schema: 'profile_schema' })
export class PersonTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  person_id: number;

  @ManyToOne(() => Person)
  person: Person;

  @Column()
  tag_id: number;

  @ManyToOne(() => Tag)
  tag: Tag;
}