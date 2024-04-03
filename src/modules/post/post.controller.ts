// src/modules/post/post.controller.ts

// Imports (Self/Module/Controller/Service)
import { FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Post, Get, UseInterceptors, UploadedFiles, Body, UseGuards, Request, Param, ParseIntPipe } from '@nestjs/common';
import { PersonService } from '@modules/person/person.service';
import { PostService } from '@modules/post/post.service';
import { JwtGuard } from '@modules/auth/jwt/jwt-guard.service';
import { CreatePostDto } from '@dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly personService: PersonService,
    private readonly postService: PostService,
  ) {}

  // Upload images to S3 & return image URLs
  @UseGuards(JwtGuard) @Post('upload')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadImages(@UploadedFiles() images: Array<Express.Multer.File>) {
    const imageUrls = await this.postService.uploadImagesToS3(images);
    return imageUrls;
  }

  // Create a new post (with tagging & adding image URLs) & return the post DB
  @UseGuards(JwtGuard) @Post('create')
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    const person = await this.personService.getPersonByUserId(req.user_id); // Get person by user_id
    return await this.postService.create(person.id, createPostDto);         // Create a new post
  }

  // Get all posts by userId
  @UseGuards(JwtGuard) @Get(':userId/posts')
  async getPostsByUserId(@Request() req) {
    const person = await this.personService.getPersonByUserId(req.user_id); // Get person by user_id
    return this.postService.getPostsByPersonId(person.id);
  }
  
  // Get all posts by personId
  @UseGuards(JwtGuard) @Get(':personId/posts')
  async getPostsByPersonId(@Param('personId', ParseIntPipe) personId: number) {
    return this.postService.getPostsByPersonId(personId);
  }

  // Get a post with postId
  @UseGuards(JwtGuard) @Get(':postId')
  async getPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.getPostById(postId);
  }

  // Create a new comment (with adding to the post) & return the comment DB
  @UseGuards(JwtGuard) @Post(':postId/comment')
  async createComment(@Request() req, @Param('postId', ParseIntPipe) postId: number, @Body('content') content: string, ) {
    const person = await this.personService.getPersonByUserId(req.user_id); // Get person by user_id
    return this.postService.createComment(postId, person.id, content);      // Create a new comment
  }

  //
  @UseGuards(JwtGuard) @Get(':postId/comments')
  async getComments(@Param('postId') postId: number) {
    return this.postService.getCommentsByPostId(postId);
  }  
}
