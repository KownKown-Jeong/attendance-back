// src/entities/person-tagJUNC.entity.ts
// The entity class for the person & tag JUNCTION table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { PersonTag } from './person-tag.entity';

@Entity({ name: 'person.tagJUNC' })
export class PersonTagJUNC {
  // Person TagJUNC Number
  @PrimaryGeneratedColumn()
  id: number;

  // Person ID
  @Column()
  person_id: number;

  // Person TagJUNC relationship with Person
  @ManyToOne(() => Person)
  person: Person;

  // Tag ID
  @Column()
  tag_id: number;

  // Person TagJUNC relationship with Tag
  @ManyToOne(() => PersonTag)
  tag: PersonTag;
}