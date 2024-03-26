// src/entities/group-member.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from './group.entity';
import { Person } from './person.entity';

@Entity({ schema: 'group_schema' })
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group_id: number;

  @ManyToOne(() => Group)
  group: Group;

  @Column()
  person_id: number;

  @ManyToOne(() => Person)
  person: Person;
}