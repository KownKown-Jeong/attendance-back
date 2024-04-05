// src/entities/user.entity.ts
// The entity class for the user table
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  // User number
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'person_id' })
  personId: number;

  // User ID(Phone number, except 010)
  @Column({ unique: true })
  user_id: string;

  // User hashed password 
  @Column()
  user_password: string;
}