// src/entities/person-family.entity.ts
// The entity class for the family JUNCTION table to each person
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Person } from './person.entity';
import { FamilyRelationType } from '@common/enums';

@Entity({ name: 'person.familyJUNC' })
export class FamilyJUNC {
  // Family number
  @PrimaryGeneratedColumn()
  id: number;

  // Family connected with this field
  // Family relationship with Parent-Person
  @ManyToOne(() => Person, person => person.parent)
  parent: Person;

  // Family relationship with Children-Person
  @ManyToOne(() => Person, person => person.children)
  child: Person;

  // Family relation type
  @Column({
    type: 'enum',
    enum: FamilyRelationType,
  })
  relationType: FamilyRelationType;
}