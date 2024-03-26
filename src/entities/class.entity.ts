// src/entities/class.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from './department.entity';

@Entity({ schema: 'group_schema' })
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  department_id: number;

  @ManyToOne(() => Department)
  department: Department;

  @Column()
  name: string;
}