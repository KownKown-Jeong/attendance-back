// src/entities/person-family.entity.ts
// The entity class for the family JUNCTION table to each person
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Person } from './person.entity';
import { FamilyRelationType } from '@common/enums';

@Entity({ name: 'person.familyJUNC' })
export class FamilyJUNC {
  // Family number
  @PrimaryGeneratedColumn()
  id: number;

  // Parent ID
  @Column()
  parent_id: number;

  // Family connected with this field
  // Family relationship with Parent-Person
  @ManyToOne(() => Person, person => person.parent)
  @JoinColumn({ name: 'parent_id' })
  parent: Person;

  // Child ID
  @Column()
  child_id: number;  

  // Family relationship with Children-Person
  @ManyToOne(() => Person, person => person.children)
  @JoinColumn({ name: 'child_id' })
  child: Person;

  // Family relation type
  @Column({
    type: 'enum',
    enum: FamilyRelationType,
  })
  relationType: FamilyRelationType;
}