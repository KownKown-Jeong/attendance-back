// src/auth/services/user-resistration.service.ts
// Searching new user from the database and registering the new one

import { Injectable, BadRequestException } from '@nestjs/common';

// Entities for injectRepositories
import { User } from '@entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Typedefines for parameters
import { aPerson } from '@dto/sign-up.dto';

// For password hashing
import * as bcrypt from 'bcrypt';   

@Injectable()
export class UserResistrationService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async create(aPerson: aPerson, password: string) : Promise<User> {
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
        const user:User = this.userRepository.create({
            user_id: aPerson.phone_number,
            user_password: hashedPassword,
        });
 
        return await this.userRepository.save(user);
    }
}
