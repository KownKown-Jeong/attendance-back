// src/modules/post/post.controller.ts

// Imports (Self/Module/Controller/Service)
import { FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Post, Get, UseInterceptors, UploadedFiles, Body, UseGuards, Request, Param, ParseIntPipe } from '@nestjs/common';
import { PostService } from '@modules/post/post.service';
import { JwtGuard } from '@modules/auth/jwt/jwt-guard.service';
import { CreatePostDto } from '@dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}
s
  // Upload images to S3 & return image URLs
  @UseGuards(JwtGuard) @Post('upload')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadImages(@UploadedFiles() images: Array<Express.Multer.File>) {
    const postImages = await this.postService.uploadImagesToS3(images);
    return postImages.map(postImage => postImage.id);
  }

  // Create a new post (with tagging & adding image URLs) & return the post DB
  @UseGuards(JwtGuard) @Post('create')
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    return await this.postService.create(req.personId, createPostDto);         // Create a new post
  }

  // Get all posts by userId
  @UseGuards(JwtGuard) @Get(':userId/posts')
  async getPostsByUserId(@Request() req) {
    return this.postService.getPostsByPersonId(req.personId); 
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
    return this.postService.createComment(postId, req.personId, content);      // Create a new comment
  }

  //
  @UseGuards(JwtGuard) @Get(':postId/comments')
  async getComments(@Param('postId') postId: number) {
    return this.postService.getCommentsByPostId(postId);
  }  
}
