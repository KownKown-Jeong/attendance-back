// src/entities/person-tagJUNC.entity.ts
// The entity class for the person & tag JUNCTION table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Person } from './person.entity';
import { PersonTag } from './person-tag.entity';

@Entity({ name: 'person.tagJUNC' })
export class PersonTagJUNC {
  // Person TagJUNC Number
  @PrimaryGeneratedColumn()
  id: number;

  // Person TagJUNC relationship with Person
  @Column({ name: 'person_id' })
  personId: number;
  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  // Person TagJUNC relationship with Tag
  @Column({ name: 'tag_id' })
  tagId: number;
  @ManyToOne(() => PersonTag)
  @JoinColumn({ name: 'tag_id' })
  tag: PersonTag;
}