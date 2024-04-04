// src/modules/post/post.service.ts
// The PostService has functions which uploadImagesToS3, create.

// Imports (Self/Module/Controller/Service)
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostBody } from '@entities/post-body.entity';
import { PostTag } from '@entities/post-tag.entity';
import { PostTagJUNC } from '@entities/post-tagJUNC.entity';
import { PostImage } from '@entities/post-image.entity';
import { CreatePostDto } from '@dto/create-post.dto';
import { PostComment } from '@entities/post-comment.entity';
import { Person } from '@entities/person.entity';

@Injectable()
export class PostService {
  private readonly s3: S3;

  constructor(
    @InjectRepository(PostBody)
    private readonly postRepository: Repository<PostBody>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(PostTag)
    private readonly postTagRepository: Repository<PostTag>,
    @InjectRepository(PostTagJUNC)
    private readonly postTagJUNCRepository: Repository<PostTagJUNC>,
    @InjectRepository(PostImage)
    private readonly postImageRepository: Repository<PostImage>,
    @InjectRepository(PostComment)
    private readonly postCommentRepository: Repository<PostComment>,
  ) {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  // Upload images to S3
  async uploadImagesToS3(images: Array<Express.Multer.File>): Promise<PostImage[]> {
    const s3 = new S3();
    const uploadedImages: PostImage[] = [];

    for (const image of images) {
      const fileName = `${Date.now()}-${image.originalname}`;
      const params = {
        Bucket: 'testimages123bucket',
        Key: fileName,
        Body: image.buffer,
      };

      await s3.upload(params).promise();

      const postImage = new PostImage();
      postImage.url = `https://testimages123bucket.s3.amazonaws.com/${fileName}`;
      postImage.uploaded_at = new Date();

      const savedImage = await this.postImageRepository.save(postImage);
      uploadedImages.push(savedImage);
    }

    return uploadedImages;
  }

  // Create a new post
  async create(person_id: number, createPostDto: CreatePostDto) {
    const { title, content, tags, uploadedImages} = createPostDto;
    const post = this.postRepository.create({
      person_id: person_id,
      title: title,
      content: content,
      type: 'visible',
    });
    const newPost = await this.postRepository.save(post);
    
    // Create Tags & Tagging
    if (tags) {
      for (const tagName of tags) {
        let tag = await this.postTagRepository.findOne({ where: { name: tagName } });
        if (!tag) {
          tag = await this.createTag(tagName);
        }
        await this.addTagToPost(newPost, tag);
      }
    }

    // Juncture the post and images
    if (uploadedImages && uploadedImages.length > 0) {
      for (const uploadedImage of uploadedImages) {
        uploadedImage.post_body_id = newPost.id;
      }
      await this.postImageRepository.save(uploadedImages);
    }
    return newPost;
  }

  async getPostById(postId: number) {
    return this.postRepository.findOne({ where: { id: postId }, relations: ['postImages', 'postTagJUNCs', 'postTagJUNCs.tag', 'postComments', 'postComments.person'], });
  }

  async getPostsByPersonId(personId: number) {
    return this.personRepository.findOne({ where: { id: personId }, relations: ['postBodies', 'postBodies.postImages', 'postBodies.postTagJUNCs', 'postBodies.postTagJUNCs.tag', 'postBodies.postComments', 'postBodies.postComments.person'],
    });
  }

  // Create a new tag
  async createTag(name: string) {
    const tag = this.postTagRepository.create({ name });
    return this.postTagRepository.save(tag);
  }

  // Add a tag to a post
  async addTagToPost(postBody: PostBody, tag: PostTag) {
    const postTagJUNC = this.postTagJUNCRepository.create({ postBody: postBody, tag: tag }); 
    return this.postTagJUNCRepository.save(postTagJUNC);
  }

  async createComment(postId: number, authorId: number, content: string) {
    const comment = this.postCommentRepository.create({
      post_id: postId,
      author_id: authorId,
      content,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return this.postCommentRepository.save(comment);
  }
    
  async getCommentsByPostId(postId: number) {
    return this.postCommentRepository.find({where: { post_id: postId }, relations: ['person'], });
  } 
}