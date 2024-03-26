// src/entities/person.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';

@Entity({ schema: 'profile_schema' })
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  date_of_birth: Date;

  @Column()
  profile_image_id: number;

  @ManyToOne(() => Image)
  profile_image: Image;
}