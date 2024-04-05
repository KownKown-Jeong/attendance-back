// src/entities/person-image.entity.ts
// The entity class for the profile image table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity({ name: 'person.image' })
export class PersonImage {
  // Person Image number
  @PrimaryGeneratedColumn()
  id: number;

  // Image URL
  @Column()
  url: string;

  // Image description 
  @Column({ nullable: true })
  description: string;

  // Image uploaded date
  @Column()
  uploaded_at: Date;

  // Image relationship with Person'
  @Column({ name: 'person_id' })
  personId: number;
  @ManyToOne(() => Person, (person) => person.images, { nullable: true })
  @JoinColumn({ name: 'person_id' })
  person: Person;
}