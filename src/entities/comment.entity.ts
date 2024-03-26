// src/entities/comment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { Person } from './person.entity';

@Entity({ schema: 'board_schema' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post_id: number;

  @ManyToOne(() => Post)
  post: Post;

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
}