// src/entities/tag.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'board_schema' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}