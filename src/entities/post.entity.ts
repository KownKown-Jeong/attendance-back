// src/entities/post.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity({ schema: 'board_schema' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author_id: number;

  @ManyToOne(() => Person)
  author: Person;

  @Column()
  content: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  visibility: string;
}