<<<<<<< HEAD
// src/entities/attendanceJUNC.entity.ts
=======
// src/entities/attendance.entity.ts
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
// The entity class for the attendance JUNCTION table
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AttendanceDate } from './attendance-date.entity';
import { RoleJUNC } from './group-roleJUNCentity';
import { Person } from './person.entity';

@Entity({ name: 'attendanceJUNC' })
export class AttendanceJUNC {
  // Attendance Number
  @PrimaryGeneratedColumn()
  id: number;

  // Attendance relationship with Person
<<<<<<< HEAD
  @Column({ name: 'person_id' })
  person_id: number;
=======
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
  @ManyToOne(() => Person, person => person.attendances)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  // Attendance relationship with RoleJUNC
<<<<<<< HEAD
  @Column({ name: 'role_id' })
  role_id: number;
=======
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
  @ManyToOne(() => RoleJUNC, roleJUNC => roleJUNC.attendances)
  @JoinColumn({ name: 'role_id' })
  roleJUNC: RoleJUNC;

<<<<<<< HEAD
  // Attendance relationship with AttendanceDate
  @Column({ name: 'date_id' })
  date_id: number;
=======
    // Attendance relationship with AttendanceDate
>>>>>>> a73401d1f5efcc9523afe315ee9bb98739c79ebb
  @ManyToOne(() => AttendanceDate, attendanceDate => attendanceDate.attendances)
  @JoinColumn({ name: 'date_id' })
  attendance_date: AttendanceDate;

  // Status
  @Column({ nullable: true })
  status: string;

  // Entry time
  @Column({ nullable: true })
  entry_time: string;

  // Exit time
  @Column({ nullable: true })
  exit_time: string;
}