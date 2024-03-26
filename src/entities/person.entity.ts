// src/entities/person.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Address } from './address.entity';
import { Tag } from './tag.entity';

@Entity({ schema: 'profile_schema' })
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  date_of_birth: Date;

  @Column()
  profile_image_id: number;
  
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Address, address => address.people)
  address: Address;

  @ManyToOne(() => Image)
  profile_image: Image;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'person_tag' })
  tags: Tag[];

  @ManyToMany(() => Person, (person) => person.familyMembers)
  @JoinTable()
  familyMembers: Person[];
}