// src/entities/group-department.entity.ts
// The entity class for the department table
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Part } from './group-department-part.entity';

@Entity({ name: 'group.department' })
export class Department {
  // Department Number
  @PrimaryGeneratedColumn()
  id: number;

  // Department name
  @Column()
  name: string;

  // Department description, nullable
  @Column({ nullable: true })
  description: string;

  // Department relationship with Part, nullable
  @OneToMany(() => Part, part => part.department, { nullable: true })
  parts: Part[];

  // Department able to connect each other with Parent and Children
  // Department relationship with Parent-Department, nullable
  @Column({ name: 'parent_id', nullable: true })
  parentId: number;
  @ManyToOne(() => Department, department => department.children, { nullable: true } )
  @JoinColumn({ name: 'parent_id' })
  parent: Department;

  // Department relationship with Children-Departments, nullable
  @OneToMany(() => Department, department => department.parent, { nullable: true })
  children: Department[];

  // Department start date, nullable
  @Column({ type: 'date',  nullable: true })
  startDate: Date;

  // Department end date, nullable
  @Column({ type: 'date', nullable: true })
  endDate: Date;
}