// src/entities/post-tag-cnt.entity.ts
// The entity class for the post tag JUNCTION table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { PostTag } from './post-tag.entity';

@Entity({ name: 'post.tagJUNC' })
export class PostTagJUNC {
  // Post Tag number
  @PrimaryGeneratedColumn()
  id: number;

  // Post ID
  @Column()
  post_id: number;

  // Post relationship with Post
  @ManyToOne(() => Post, post => post.postTagJUNCs)
  post: Post;

  // Tag ID
  @Column()
  tag_id: number;

  // Tag relationship with PostTag
  @ManyToOne(() => PostTag, postTag => postTag.postTagJUNCs)
  tag: PostTag;
}