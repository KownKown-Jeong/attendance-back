// src/user/dto/sign-up.dto.ts
import { Gender, Relationship } from '@common/enums';

// Formet of a person
export class aPerson {
  name: string;
  gender: Gender;
  date_of_birth: Date;
  phone_number: string;
  address: string;
  tags: string[];
}

// Format of familyMembers
export class familyMembers {
  aPerson: aPerson;
  relationship: Relationship;
}

// Formet of a SignUpDto
export class SignUpDto {
  aPerson: aPerson;
  password: string;
  familyMembers: familyMembers[];
}

