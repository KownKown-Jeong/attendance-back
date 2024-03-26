// src/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity({ schema: 'user_schema' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone_number: string;

  @Column()
  password_hash: string;

  @OneToOne(() => Person, (person) => person.user, { nullable: true })
  person: Person;
}