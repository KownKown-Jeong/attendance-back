// src/modules/post/post.service.ts
// The PostService has functions which uploadImagesToS3, create.

// Imports (Self/Module/Controller/Service)
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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
    const { title, content, tags, uploadedImageIds} = createPostDto;
    const post = this.postRepository.create({
      title: title,
      content: content,
      type: 'visible',
    });
    const thePerson = await this.personRepository.findOne({ where: { id : person_id } });
    post.person = thePerson;
    const newPost = await this.postRepository.save(post);
    
    // Create Tags & Tagging
    if (tags) {
      for (const tagName of tags) {
        let tag = await this.postTagRepository.findOne({ where: { name: tagName } });
        if (!tag) { tag = await this.createTag(tagName); }
        await this.addTagToPost(newPost, tag);
      }
    }

    // Juncture the post and images
    if (uploadedImageIds && uploadedImageIds.length > 0) {
      const postImages = await this.postImageRepository.findBy({ id: In(uploadedImageIds), });
      newPost.postImages = postImages;
      await this.postRepository.save(newPost);
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

  async createComment(post_id: number, person_id: number, content: string) {
    const newComment = this.postCommentRepository.create({
      content,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const thePost = await this.postRepository.findOne({ where: { id : post_id } });
    newComment.postBody = thePost;
    const thePerson = await this.personRepository.findOne({ where: { id : person_id } });
    newComment.person = thePerson;
    return this.postCommentRepository.save(newComment);
  }
    
  async getCommentsByPostId(post_id: number) {
    return this.postCommentRepository.find({where: { postId: post_id }, relations: ['person'], });
  } 
}