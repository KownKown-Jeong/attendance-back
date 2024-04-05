// src/modules/auth/jwt/jwt.service.ts
// The JwtService used to create/verify token.

// Imports (Self/Module/Controller/Service)
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
// Typedefines for parameters
import { User } from '@entities/user.entity';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService
    ) {}

  // Generate token using user's user_id
  async create(user: User) {
    const payload = { sub: user.user_id };        // user_id == phone_number
    return this.jwtService.signAsync(payload);
  }
  // Verify token
  async verify(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      // Handle token verification error
      throw new UnauthorizedException('Invalid token');
    }
  }
}