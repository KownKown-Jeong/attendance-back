<<<<<<< HEAD
// src/entities/post-body.entity.ts
=======
// src/entities/post.entity.ts
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
// The entity class for the post table
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Person } from './person.entity';
import { PostImage } from './post-image.entity';
import { PostComment } from './post-comment.entity';
import { PostTagJUNC } from './post-tagJUNC.entity';

@Entity({ name: 'post.body' })
export class PostBody {
  // Post number
  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
  // Post relationship with Person
  @Column({ name: 'person_id' })
  personId: number;
  @ManyToOne(() => Person, (person) => person.postBodys)
  @JoinColumn({ name: 'person_id' })
  person: Person;

=======
  // Person number
  @Column()
  person_id: number;

  // Post relationship with Person
  @ManyToOne(() => Person, (person) => person.postBodys)
  @JoinColumn({ name: 'author_id' })
  person: Person;

  // Image number
  @Column({ nullable: true })
  post_image_id: number;

>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
  // Post relationship with PostImage, nullable
  @OneToMany(() => PostImage, (postImage) => postImage.postBody, { nullable: true })
  postImages: PostImage[];

  // Post title
  @Column('text')
  title: string;

  // Post content
  @Column('text')
  content: string;
  
  // Post creation time
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Post update time
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Post type
  @Column({
    type: 'enum',
    enum: ['visible', 'non-visible'],
  })
  type: 'visible' | 'non-visible';

  // Post relationship with PostComment, nullable
  @OneToMany(() => PostComment, (postComment) => postComment.postBody, { nullable: true })
  postComments: PostComment[];

  // Post relationship with PostTagJUNC, nullable
  @OneToMany(() => PostTagJUNC, (postTagJUNC) => postTagJUNC.postBody, { nullable: true })
  postTagJUNCs: PostTagJUNC[];
}