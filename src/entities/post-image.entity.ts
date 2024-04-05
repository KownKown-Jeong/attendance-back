// src/entities/post-image.entity.ts
// The entity class for the post image table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PostBody } from './post-body.entity';

@Entity({ name: 'post.image' })
export class PostImage {
  // Post Image number
  @PrimaryGeneratedColumn()
  id: number;
<<<<<<< HEAD
  
  // Image relationship with Post
  @Column({ name: 'post_id' })
  postId: number;
=======

  // Post Body ID
  @Column()
  post_body_id: number;
  
  // Image relationship with Post
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
  @ManyToOne(() => PostBody, (postBody) => postBody.postImages)
  @JoinColumn({ name: 'post_id' })
  postBody: PostBody;

  // Image URL
  @Column()
  url: string;

  // Image uploaded date
  @Column()
  uploaded_at: Date;
}