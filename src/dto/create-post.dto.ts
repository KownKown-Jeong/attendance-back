// src/dto/create-post.dto.ts

import { IsString, IsOptional } from 'class-validator';
import { PostImage } from '@entities/post-image.entity';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  uploadedImages?: PostImage[];
}