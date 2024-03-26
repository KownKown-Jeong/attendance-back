// src/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'user_schema' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone_number: string;

  @Column()
  password_hash: string;
}