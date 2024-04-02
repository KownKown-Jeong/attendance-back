// src/modules/auth/auth.module.ts

// Imports (Self/Module/Controller/Service)
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@modules/user/user.module';
import { PersonModule } from '@modules/person/person.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
// JWT Module & Services
import { JwtService } from './jwt/jwt.service';
import { JwtGuard } from './jwt/jwt-guard.service';
import { JwtStrategy } from './jwt/jwt-strategy.service';

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
    UserModule,
    PersonModule,
    PassportModule,
    NestJwtModule.register({
      secret: process.env.JWT_SECRET,     // secret key, you have to change this value with secretOrKey value in jwt-strategy
      signOptions: { expiresIn: '1y' },   // expires in 1 year
      // signOptions: { expiresIn: getExpirationTime() }, // expires in end of this year
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtGuard, JwtStrategy],
  exports: [JwtGuard],
})
export class AuthModule {}