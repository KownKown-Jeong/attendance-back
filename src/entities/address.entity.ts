// src/entities/address.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Person } from './person.entity';

@Entity({ schema: 'profile_schema' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @OneToMany(() => Person, person => person.address)
  people: Person[];
}