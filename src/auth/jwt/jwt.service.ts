// src/auth/jwt/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from '@entities/user.entity';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  // Generate token using user's user_id
  async generateToken(user: User) {
    const payload = { sub: user.user_id }; // user_id는 전화번호를 나타냅니다.
    return this.jwtService.signAsync(payload);
  }

  // Verify token and return the payload
  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}