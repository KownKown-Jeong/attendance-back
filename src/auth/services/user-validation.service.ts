// src/auth/services/user-validation.service.ts
// Check if the user exists in the database and validate the user password

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

// Entities for injectRepositories
import { User } from '@entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserValidationService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async check(user_id: string, password: string) : Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { user_id: user_id }
        });
        if (!user) {
          throw new NotFoundException('User not found');
          }
        if (user.user_password !== password) {
          throw new UnauthorizedException('Invalid password');
        }
        return user;
    }
}