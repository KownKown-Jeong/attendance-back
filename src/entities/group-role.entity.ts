// src/entities/group-role.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from './group.entity';
import { Role } from './role.entity';

@Entity({ schema: 'group_schema' })
export class GroupRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group_id: number;

  @ManyToOne(() => Group)
  group: Group;

  @Column()
  role_id: number;

  @ManyToOne(() => Role)
  role: Role;
}