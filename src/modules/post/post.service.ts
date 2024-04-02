// src/modules/post/post.service.ts
// The PostService has functions which uploadImagesToS3, create.

// Imports (Self/Module/Controller/Service)
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostBody } from '@entities/post-body.entity';
import { PostImage } from '@entities/post-image.entity';
import { CreatePostDto } from '@dto/create-post.dto';

@Injectable()
export class PostService {
  private readonly s3: S3;

  constructor(
    @InjectRepository(PostBody)
    private readonly postRepository: Repository<PostBody>,
    @InjectRepository(PostImage)
    private readonly postImageRepository: Repository<PostImage>,
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
    const { title, content } = createPostDto;
    const post = this.postRepository.create({
      person_id: person_id,
      title: createPostDto.title,
      content: createPostDto.content,
      type: 'visible',
    });
    return this.postRepository.save(post);
  }
}