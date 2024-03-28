// src/entities/user.entity.ts
// The entity class for the user table
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity({ name: 'user' })
export class User {
  // User number
  @PrimaryGeneratedColumn()
  id: number;

  // User ID(Phone number, except 010)
  @Column({ unique: true })
  user_id: string;

  // User password hash
  @Column()
  user_password: string;

  // User relationship with Person
  @OneToOne(() => Person, (person) => person.user, )
  person: Person;
}