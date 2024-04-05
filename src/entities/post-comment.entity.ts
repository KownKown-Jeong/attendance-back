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

<<<<<<< HEAD
  // Comment relationship with Post
  @Column({ name: 'post_id' })
  postId: number;
=======
  // Post ID
  @Column()
  post_id: number;

  // Comment relationship with Post
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
  @ManyToOne(() => PostBody, postBody => postBody.postComments)
  @JoinColumn({ name: 'post_id' })
  postBody: PostBody;

<<<<<<< HEAD
  // Comment relationship with Person
  @Column({ name: 'person_id' })
  personId: number;
  @ManyToOne(() => Person, person => person.postComments)
  @JoinColumn({ name: 'person_id' })
=======
  // Author(Person) ID
  @Column()
  author_id: number;

  // Comment relationship with Person
  @ManyToOne(() => Person, person => person.postComments)
  @JoinColumn({ name: 'author_id' })
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
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