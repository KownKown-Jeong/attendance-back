import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { PersonModule } from '@modules/person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostBody } from '@entities/post-body.entity';
import { PostImage } from '@entities/post-image.entity';
import { PostComment } from '@entities/post-comment.entity';
import { PostTag } from '@entities/post-tag.entity';
import { PostTagJUNC } from '@entities/post-tagJUNC.entity';
import { Person } from '@entities/person.entity';

import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    AuthModule,
    PersonModule,
    TypeOrmModule.forFeature([PostBody, PostImage, PostComment, PostTag, PostTagJUNC, Person])
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}