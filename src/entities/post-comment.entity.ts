// src/entities/post-comment.entity.ts
// The entity class for the post comment table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PostBody } from './post-body.entity';
import { Person } from './person.entity';

@Entity({ name: 'post.comment' })
export class PostComment {
  // Post Comment number
  @PrimaryGeneratedColumn()
  id: number;

  // Comment relationship with Post
  @Column({ name: 'post_id' })
  postId: number;
  @ManyToOne(() => PostBody, postBody => postBody.postComments)
  @JoinColumn({ name: 'post_id' })
  postBody: PostBody;

  // Comment relationship with Person
  @Column({ name: 'person_id' })
  personId: number;
  @ManyToOne(() => Person, person => person.postComments)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  // Comment content
  @Column()
  content: string;

  // Comment created date
  @Column()
  created_at: Date;

  // Comment updated date
  @Column()
  updated_at: Date;
}