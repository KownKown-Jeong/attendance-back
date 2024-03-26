// src/entities/post-image.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { Image } from './image.entity';

@Entity({ schema: 'board_schema' })
export class PostImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post_id: number;

  @ManyToOne(() => Post)
  post: Post;

  @Column()
  image_id: number;

  @ManyToOne(() => Image)
  image: Image;
}