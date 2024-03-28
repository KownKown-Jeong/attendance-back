// src/entities/post.entity.ts
// The entity class for the post table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Person } from './person.entity';
import { PostImage } from './post-image.entity';
import { PostComment } from './post-comment.entity';
import { PostTagJUNC } from './post-tagJUNC.entity';

@Entity({ name: 'post' })
export class Post {
  // Post number
  @PrimaryGeneratedColumn()
  id: number;

  // Person number
  @Column()
  person_id: number;

  // Post relationship with Person
  @ManyToOne(() => Person, (person) => person.posts)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  // Image number
  @Column({ nullable: true })
  post_image_id: number;

  // Post relationship with PostImage, nullable
  @OneToOne(() => PostImage, (image) => image.post, { nullable: true })
  @JoinColumn({ name: 'post_image_id' })
  image: PostImage;

  // Post title
  @Column('text')
  title: string;

  // Post content
  @Column('text')
  content: string;
  
  // Post creation time
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  // Post update time
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  // Post type
  @Column({
    type: 'enum',
    enum: ['visible', 'non-visible'],
  })
  type: 'visible' | 'non-visible';

  // Post relationship with PostComment, nullable
  @OneToMany(() => PostComment, (comment) => comment.post, { nullable: true })
  comments: PostComment[];

  // Post relationship with PostTagJUNC, nullable
  @OneToMany(() => PostTagJUNC, (postTagJUNC) => postTagJUNC.post, { nullable: true })
  postTagJUNCs: PostTagJUNC[];
}