<<<<<<< HEAD
// src/entities/post-tagJUNC.entity.ts
=======
// src/entities/post-tag-cnt.entity.ts
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
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
<<<<<<< HEAD
  @Column({ name: 'post_id' })
  postId: number;
=======
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
  @ManyToOne(() => PostBody, postBody => postBody.postTagJUNCs)
  @JoinColumn({ name: 'post_id' })
  postBody: PostBody;

  // Tag relationship with PostTag
<<<<<<< HEAD
  @Column({ name: 'tag_id' })
  tagId: number;
=======
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
  @ManyToOne(() => PostTag, postTag => postTag.postTagJUNCs)
  @JoinColumn({ name: 'tag_id' })
  tag: PostTag;
}