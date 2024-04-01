// src/auth/auth.service.ts
// This is the main file that contains the business logic for the authentication service.

import { Injectable } from '@nestjs/common';

// Data Transfer Object Class
import { SignUpDto } from '../dto/sign-up.dto';

// Modules
import { UserResistrationService } from '@auth/services/user-resistration.service';
import { PersonService } from '../person/person.service';

// Services
import { JwtService } from './jwt/jwt.service';
import { UserValidationService } from './services/user-validation.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userResistrationService: UserResistrationService,
    private readonly personService: PersonService,
    private readonly jwtService: JwtService,
    private readonly userValidateionService: UserValidationService,
  ) {}
  
  // signUp method
  async signUp(signUpDto: SignUpDto) {
    const { aPerson, password } = signUpDto;
  
    // User registration
    const newuser = await this.userResistrationService.create(aPerson, password);

    // Person registration
    await this.personService.create(signUpDto, newuser);

    // Generate token using user's user_id
    const token = this.jwtService.generateToken(newuser);
    return { token }; 
  }

  // verifyToken method
  async verifyUser(user_id: string, password: string) {
    return await this.userValidateionService.check(user_id, password);
  }

}
