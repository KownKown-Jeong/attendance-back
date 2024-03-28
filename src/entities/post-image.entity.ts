// src/entities/post-image.entity.ts
// The entity class for the post image table
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity({ name: 'post.image' })
export class PostImage {
  // Post Image number
  @PrimaryGeneratedColumn()
  id: number;

  // Image URL
  @Column()
  url: string;

  // Image uploaded date
  @Column()
  uploaded_at: Date;

  // Image relationship with Post
  @OneToOne(() => Post, (post) => post.image)
  post: Post;
}