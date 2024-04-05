// src/entities/post-tagJUNC.entity.ts
// The entity class for the post tag JUNCTION table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PostBody } from './post-body.entity';
import { PostTag } from './post-tag.entity';

@Entity({ name: 'post.tagJUNC' })
export class PostTagJUNC {
  // Post Tag number
  @PrimaryGeneratedColumn()
  id: number;

  // Post relationship with Post
  @Column({ name: 'post_id' })
  postId: number;
  @ManyToOne(() => PostBody, postBody => postBody.postTagJUNCs)
  @JoinColumn({ name: 'post_id' })
  postBody: PostBody;

  // Tag relationship with PostTag
  @Column({ name: 'tag_id' })
  tagId: number;
  @ManyToOne(() => PostTag, postTag => postTag.postTagJUNCs)
  @JoinColumn({ name: 'tag_id' })
  tag: PostTag;
}