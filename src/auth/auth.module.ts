// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';
import { JwtGuard } from './jwt/jwt-guard.service';
import { JwtStrategy } from './jwt/jwt-strategy.service';

// Entities
import { User } from '@entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResistrationService } from './services/user-resistration.service';

// Optional fuction to get expiration time to end of this year for signOptions.expiresIn
function getExpirationTime() {
  const currentDate = new Date();
  const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
  const timeDiff = endOfYear.getTime() - currentDate.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  return `${seconds}s`;
}

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    NestJwtModule.register({
      secret: process.env.JWT_SECRET,     // secret key, you have to change this value with secretOrKey value in jwt-strategy
      signOptions: { expiresIn: '1y' },   // expires in 1 year
      // signOptions: { expiresIn: getExpirationTime() }, // expires in end of this year
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtGuard, JwtStrategy],
  exports: [TypeOrmModule],
})
export class AuthModule {}