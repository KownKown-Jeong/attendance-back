// src/entities/post-comment.entity.ts
// The entity class for the post comment table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { Person } from './person.entity';

@Entity({ name: 'post.comment' })
export class PostComment {
  // Post Comment number
  @PrimaryGeneratedColumn()
  id: number;

  // Post ID
  @Column()
  post_id: number;

  // Comment relationship with Post
  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  // Author(Person) ID
  @Column()
  author_id: number;

  // Comment relationship with Person
  @ManyToOne(() => Person, person => person.postComments)
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