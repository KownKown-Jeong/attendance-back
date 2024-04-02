// src/modules/user/user.service.ts

// Imports (Self/Module/Controller/Service)
import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/user.entity';

// For password hashing
import * as bcrypt from 'bcrypt';   

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // Generate token using user's user_id
    async create(phone_number: string, password: string) : Promise<User> {
        // check if the user already exists
        const existingUser = await this.userRepository.findOne({ where: { user_id: phone_number } });
        if (existingUser) { throw new BadRequestException('이미 존재하는 전화번호입니다.'); }
        // password hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        // save user info
        const user:User = this.userRepository.create({
            user_id: phone_number,
            user_password: hashedPassword,
        });
 
        return await this.userRepository.save(user);
    }

    // Verify user_id and user_password and return the User
    async checkIdPw(user_id: string, password: string) : Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { user_id: user_id }
        });
        if (!user) { throw new NotFoundException('User not found'); }
        if (user.user_password !== password) { throw new UnauthorizedException('Invalid password'); }
        return user;
    }

    // Find user by user_id
    async findUser(user_id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { user_id: user_id } });
        if (!user) { throw new NotFoundException('User not found'); }
        return user;
    }
}
