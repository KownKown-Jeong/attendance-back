import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@entities/post-body.entity';
import { PostImage } from '@entities/post-image.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostImage])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}