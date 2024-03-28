// src/entities/person-address.entity.ts
// The entity class for the address table
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Person } from './person.entity';

@Entity({ name: 'person.address' })
export class Address {
  // Address Number
  @PrimaryGeneratedColumn()
  id: number;

  // Address
  @Column()
  street: string;

  // Address relationship with Person
  // One address can have multiple residents, connected with this field
  @OneToMany(() => Person, person => person.address)
  residents: Person[];
}