// src/user/services/signUp.service.ts
// NEST & ETC Functions
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';     // for hasing password
// DTO Class
import { SignUpDto } from '../dto/sign-up.dto';
// Entities & Repositories
import { User } from '@entities/user.entity';
import { Address } from '@entities/person-address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// Services
import { PersonRegistrationService } from '@user/services/personResistration.service';
import { FamilyRegistrationService } from '@user/services/familyResistration.service';
//import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly personRegistrationService: PersonRegistrationService,
    private readonly familyRegistrationService: FamilyRegistrationService,
    // private readonly authService: AuthService,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  // signUp method
  async signUp(signUpDto: SignUpDto) {
    const { aPerson, password } = signUpDto;

    // check if the user already exists
    const existingUser = await this.userRepository.findOne({ 
      where: { user_id: aPerson.phone_number } 
    });
    if (existingUser) { 
      throw new BadRequestException('이미 존재하는 전화번호입니다.'); 
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user info
    const user = this.userRepository.create({
      user_id: aPerson.phone_number,
      user_password: hashedPassword,
    });
    await this.userRepository.save(user);

    // save address
    let newAddress = null;      // Address entity
    if(aPerson.address) {
      newAddress = this.addressRepository.create({ 
        street: aPerson.address,
      });
      await this.addressRepository.save(newAddress);
    }
    
    // save Person data
    const person = await this.personRegistrationService.createPerson(signUpDto.aPerson, user, newAddress);

    // save Family data
    if (signUpDto.familyMembers && signUpDto.familyMembers.length > 0) {
      await this.familyRegistrationService.createFamily(signUpDto.familyMembers, person, newAddress);
    }

    // const token = await this.authService.generateToken(user);
    // return { token };
  }
}   