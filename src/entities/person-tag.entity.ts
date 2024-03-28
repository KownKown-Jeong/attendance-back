// src/entities/person-tag.entity.ts
// The entity class for the personal tag table
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PersonTagCNT } from './person-tagJUNC.entity';

@Entity({ name: 'person.tag' })
export class PersonTag {
  // Tag Number
  @PrimaryGeneratedColumn()
  id: number;

  // Tag name
  @Column()
  name: string;

  // Tag relationship with PersonTagCNT
  @OneToMany(() => PersonTagCNT, (personTagCNT) => personTagCNT.tag)
  personTagCNTs: PersonTagCNT[];
}