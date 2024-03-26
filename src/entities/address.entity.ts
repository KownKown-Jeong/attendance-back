// src/entities/address.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'profile_schema' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;
}