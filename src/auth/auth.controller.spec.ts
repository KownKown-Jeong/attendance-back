// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwt-guard.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    return this.authService.login(credentials);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Body() token: { token: string }) {
    return this.authService.logout(token.token);
  }
}