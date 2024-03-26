// src/entities/family-relationship.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity({ schema: 'profile_schema' })
export class FamilyRelationship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  person_id: number;

  @ManyToOne(() => Person)
  person: Person;

  @Column()
  related_person_id: number;

  @ManyToOne(() => Person)
  related_person: Person;

  @Column()
  relationship_type: string;
}