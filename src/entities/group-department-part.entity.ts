// src/entities/group-department-part.entity.ts
// The entity class for the part table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Department } from './group-department.entity';
import { RoleJUNC } from './group-roleJUNCentity';

@Entity({ name: 'group.department.part' })
export class Part {
  // Part Number
  @PrimaryGeneratedColumn()
  id: number;

  // Part relationship with RoleJUNC, which is a JUNCTION table, nullable
  @OneToMany(() => RoleJUNC, roleJUNC => roleJUNC.part, { nullable: true })
  roleJUNCs: RoleJUNC[];
 
  // Part relationship with Department
  @ManyToOne(() => Department, department => department.parts)
  @JoinColumn({ name: 'parent_id' })
  department: Department;

  // Part name
  @Column()
  name: string;

  // Part description, nullable
  @Column({ nullable: true })
  description: string;

  // Part start date, nullable
  @Column({ type: 'date', nullable: true  })
  startDate: Date;

  // Part end date, nullable
  @Column({ type: 'date', nullable: true })
  endDate: Date;
}