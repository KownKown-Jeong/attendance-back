// src/auth/auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { phoneNumber, password } = signUpDto;

    // 이미 존재하는 전화번호인지 확인
  const existingUser = await this.userRepository.findOne({ where: { phone_number: phoneNumber } });
    if (existingUser) {
      throw new BadRequestException('이미 존재하는 전화번호입니다.');
    }
    // 비밀번호 해시 처리
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 정보 저장
    const user = this.userRepository.create({
      phone_number: phoneNumber,
      password_hash: hashedPassword,
    });
    await this.userRepository.save(user);

    // JWT 토큰 생성
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}