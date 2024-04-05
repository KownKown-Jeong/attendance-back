// src/entities/person-tag.entity.ts
// The entity class for the personal tag table
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PersonTagJUNC } from './person-tagJUNC.entity';

@Entity({ name: 'person.tag' })
export class PersonTag {
  // Tag Number
  @PrimaryGeneratedColumn()
  id: number;
  
  // Tag relationship with PersonTagCNT
  @OneToMany(() => PersonTagJUNC, (personTagCNT) => personTagCNT.tag)
  personTagCNTs: PersonTagJUNC[];

  // Tag name
  @Column()
  name: string;


}