// src/entities/department.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'group_schema' })
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}