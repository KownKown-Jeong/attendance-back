// src/entities/post-tag.entity.ts
// The entity class for the post tag table
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostTagJUNC } from './post-tagJUNC.entity';

@Entity({ name: 'post.tag'  })
export class PostTag {
  // Tag number
  @PrimaryGeneratedColumn()
  id: number;

  // Tag name
  @Column()
  name: string;

  // Tag relationship with PostTagJUNC
  @OneToMany(() => PostTagJUNC, postTagJUNC => postTagJUNC.tag)
  postTagJUNCs: PostTagJUNC[];
}