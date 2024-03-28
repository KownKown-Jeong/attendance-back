// src/entities/group-role.entity.ts
// The entity class for the role table
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoleJUNC } from './group-roleJUNCentity';

@Entity({ name: 'group.role' })
export class Role {
  // Role Number
  @PrimaryGeneratedColumn()
  id: number;

  // Role name
  @Column()
  name: string;

  // Role description
  @Column({ nullable: true })
  description: string;

  // Role relationship with RoleJUNC, which is a JUNCTION table, nullable
  @OneToMany(() => RoleJUNC, roleJUNC => roleJUNC.role, { nullable: true })
  roleJUNCs: RoleJUNC[];

  // Role type (visible or non-visible) for administartors
  @Column({
    type: 'enum',
    enum: ['visible', 'non-visible'],
  })
  type: 'visible' | 'non-visible' ;
}