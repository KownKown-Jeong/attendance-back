// src/entities/person.entity.ts
// The entity class for the person table
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Attendance } from './attendanceJUNC.entity';
import { RoleJUNC } from './group-roleJUNCentity';
import { Address } from './person-address.entity';
import { FamilyJUNC } from './person-familyJUNC.entity';
import { PersonImage } from './person-image.entity';
import { PersonRecord } from './person-record.entity';
import { PersonTagCNT } from './person-tagJUNC.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity({ name: 'person' })
export class Person {
  // Person Number
  @PrimaryGeneratedColumn()
  id: number;

  // User ID
  @Column()
  user_id: number;

  // Person relationship with User
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  // Person name
  @Column()
  name: string;

  // Gender
  @Column({ type: 'enum', enum: ['man', 'woman'], })
  type: 'man' | 'woman';

  // Date of birth, nullable
  @Column({ nullable: true })
  date_of_birth: Date;

  // Phone number, except 010, nullable
  @Column({ nullable: true })
  person_image_id: number;

  // Address, nullable
  // Person relationship with Address
  @ManyToOne(() => Address, address => address.residents, { nullable: true })
  address: Address;

  // Family
  // Person relationship with FamilyJUNC, which is a JUNCTION table, nullable
  // Parent
  @OneToMany(() => FamilyJUNC, familyJUNC => familyJUNC.parent, { nullable: true })
  parent: FamilyJUNC[];
  // Children
  @OneToMany(() => FamilyJUNC, familyJUNC => familyJUNC.child, { nullable: true })
  children: FamilyJUNC[];
  
  // Profile image
  // Person relationship with Image, nullable
  @OneToMany(() => PersonImage, (personImage) => personImage.person, { nullable: true })
  images: PersonImage;
  
  // Records
  // Person relationship with Record as student, nullable
  @OneToMany(() => PersonRecord, (record) => record.student, { nullable: true })
  studentRecords: PersonRecord[];
  // Person relationship with Record as teacher, nullable
  @OneToMany(() => PersonRecord, (record) => record.teacher, { nullable: true })
  teacherRecords: PersonRecord[];
  
  // Tags
  // Person relationship with TagJUNC, which is a JUNCTION table, nullable
  @OneToMany(() => PersonTagCNT, (personTagCNT) => personTagCNT.person, { nullable: true })
  tags: PersonTagCNT[];

  // Roles
  // Person relationship with RoleJUNC, which is a JUNCTION table
  @OneToMany(() => RoleJUNC, roleJUNC => roleJUNC.person, )
  roleJUNCs: RoleJUNC[];

  // Posts
  // Person relationship with Post as author, nullable
  @OneToMany(() => Post, post => post.person, { nullable: true })
  posts: Post[];

  // Attendance
  // Person relationship with Attendance, nullable
  @OneToMany(() => Attendance, attendance => attendance.person, { nullable: true })
  attendances: Attendance[];

}