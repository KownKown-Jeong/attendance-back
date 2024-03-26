// src/entities/person-role.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { Role } from './role.entity';
import { Class } from './class.entity';

@Entity({ schema: 'group_schema' })
export class PersonRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  person_id: number;

  @ManyToOne(() => Person)
  person: Person;

  @Column()
  role_id: number;

  @ManyToOne(() => Role)
  role: Role;

  @Column()
  class_id: number | null;

  @ManyToOne(() => Class, { nullable: true })
  class: Class | null;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;
}