// src/entities/person-address.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { Address } from './address.entity';

@Entity({ schema: 'profile_schema' })
export class PersonAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  person_id: number;

  @ManyToOne(() => Person)
  person: Person;

  @Column()
  address_id: number;

  @ManyToOne(() => Address)
  address: Address;

  @Column()
  is_primary: boolean;
}