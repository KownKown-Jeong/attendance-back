// src/dto/create-post.dto.ts

<<<<<<< HEAD
import { IsString, IsOptional, IsArray , IsNumber } from 'class-validator';
=======
import { IsString, IsOptional, IsArray } from 'class-validator';
import { PostImage } from '@entities/post-image.entity';
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb

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
<<<<<<< HEAD
  @IsNumber({}, { each: true })
  uploadedImageIds?: number[];
=======
  uploadedImages?: PostImage[];
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
}