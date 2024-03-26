// src/entities/tag.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Person } from './person.entity';

@Entity({ schema: 'board_schema' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Person, (person) => person.tags)
  people: Person[];
}