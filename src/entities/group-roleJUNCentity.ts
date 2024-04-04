// src/entities/group-department-part-person-role-cnt.entity.ts
// The entity class for the part & role & person JUNCTION table
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AttendanceJUNC } from './attendanceJUNC.entity';
import { Part } from './group-department-part.entity';
import { Role } from './group-role.entity';
import { Person } from './person.entity';

@Entity({ name: 'group.roleJUNC' })
export class RoleJUNC {
  // RoleJUNC Number
  @PrimaryGeneratedColumn()
  id: number;

  // RoleJUNC relationship with Attendance, nullable
  @OneToMany(() => AttendanceJUNC, attendanceJUNC => attendanceJUNC.roleJUNC, { nullable: true })
  attendances: AttendanceJUNC[];

  // RoleJUNC relationship with GroupPart
  @ManyToOne(() => Part, part => part.roleJUNCs)
  @JoinColumn({ name: 'part_id' })
  part: Part;

  // RoleJUNC relationship with Role
  @ManyToOne(() => Role, role => role.roleJUNCs)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  // RoleJUNC relationship with Person
  @ManyToOne(() => Person, person => person.roleJUNCs)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  // RoleJUNC start date
  @Column()
  startDate: Date;
  
  // RoleJUNC end date
  @Column()
  endDate: Date;
}