// src/entities/person.entity.ts
// The entity class for the person table
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AttendanceJUNC } from './attendanceJUNC.entity';
import { RoleJUNC } from './group-roleJUNCentity';
import { Address } from './person-address.entity';
import { FamilyJUNC } from './person-familyJUNC.entity';
import { PersonImage } from './person-image.entity';
import { PersonRecord } from './person-record.entity';
import { PersonTagJUNC } from './person-tagJUNC.entity';
import { PostBody } from './post-body.entity';
import { PostComment } from './post-comment.entity';
import { Gender } from '@common/enums';           // enums

@Entity({ name: 'person' })
export class Person {
  // Person Number
  @PrimaryGeneratedColumn()
  id: number;

  // Person name
  @Column()
  name: string;

  // Gender
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  // Date of birth, nullable
  @Column({ nullable: true })
  date_of_birth: Date;

  // Phone number, nullable
  @Column({ nullable: true })
  phone_number: string;

<<<<<<< HEAD
  // Person relationship with Address
  @Column({ name: 'address_id', nullable: true })
  addressId: number;
=======
  // Address, nullable
  @Column({ nullable: true })
  address_id: Number;

  // Person relationship with Address
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
  @ManyToOne(() => Address, address => address.residents, { nullable: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  // Verification
  @Column({ default: false })
  verified: boolean;

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
  @OneToMany(() => PersonTagJUNC, (personTagJUNC) => personTagJUNC.person, { nullable: true })
  tags: PersonTagJUNC[];

  // Roles
  // Person relationship with RoleJUNC, which is a JUNCTION table, nullable
  @OneToMany(() => RoleJUNC, roleJUNC => roleJUNC.person, { nullable: true })
  roleJUNCs: RoleJUNC[];

  // Posts
  // Person relationship with Post as author, nullable
  @OneToMany(() => PostBody, postBody => postBody.person, { nullable: true })
  postBodys: PostBody[];

  // Post Comments
  // Person relationship with PostComment as author, nullable
  @OneToMany(() => PostComment, postComment => postComment.person, { nullable: true })
  postComments: PostComment[];

  // Attendance
  // Person relationship with Attendance, nullable
  @OneToMany(() => AttendanceJUNC, attendanceJUNC => attendanceJUNC.person, { nullable: true })
  attendances: AttendanceJUNC[];
}