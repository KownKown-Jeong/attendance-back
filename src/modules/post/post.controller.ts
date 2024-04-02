// src/modules/post/post.controller.ts

// Imports (Self/Module/Controller/Service)
import { FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Post, UseInterceptors, UploadedFiles, Body, UseGuards, Request } from '@nestjs/common';
import { PersonService } from '@modules/person/person.service';
import { PostBody } from '@entities/post-body.entity';
import { PostService } from '@modules/post/post.service';
import { JwtGuard } from '@modules/auth/jwt/jwt-guard.service';
import { CreatePostDto } from '@dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostImage } from '@entities/post-image.entity';

@Controller('post')
export class PostController {
  constructor(
    private readonly personService: PersonService,
    private readonly postService: PostService,
    @InjectRepository(PostBody)
    private readonly postRepository: Repository<PostBody>,
    @InjectRepository(PostImage)
    private readonly postImageRepository: Repository<PostImage>,
  ) {}

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadImages(@UploadedFiles() images: Array<Express.Multer.File>) {
    const imageUrls = await this.postService.uploadImagesToS3(images);
    return imageUrls;
  }

  @UseGuards(JwtGuard)
  @Post('create')
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    const user_id = req.user_id;
    // Get person by user_id
    const person = await this.personService.getPersonByUserId(user_id);
    // Create a new post
    const newPost = await this.postService.create(person.id, createPostDto);
    // Juncture the post and images
    if (createPostDto.uploadedImages && createPostDto.uploadedImages.length > 0) {
      newPost.postImages = createPostDto.uploadedImages;
      await this.postRepository.save(newPost);
    }
    return newPost;
  }
}
