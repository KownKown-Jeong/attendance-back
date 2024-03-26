// src/auth/dto/sign-up.dto.ts
export class SignUpDto {
    phoneNumber: string;
    password: string;

    name: string;
    gender: string;
    dateOfBirth: Date;
    address: string;
    
    familyMembers: {
      name: string;
      gender: string;
      dateOfBirth: Date;
      relationship: string;
      phoneNumber: string;
      tags: string[];
    }[];
  }