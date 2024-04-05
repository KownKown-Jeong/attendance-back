// src/dto/create-post.dto.ts

import { IsString, IsOptional, IsArray , IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  uploadedImageIds?: number[];
}