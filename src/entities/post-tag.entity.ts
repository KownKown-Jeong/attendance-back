// src/entities/post-tag.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

@Entity({ schema: 'board_schema' })
export class PostTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post_id: number;

  @ManyToOne(() => Post)
  post: Post;

  @Column()
  tag_id: number;

  @ManyToOne(() => Tag)
  tag: Tag;
}