// src/auth/auth.controller.ts
import { UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { JwtGuard } from './jwt/jwt-guard.service';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

import { LoginDto } from '@dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  // 1. vue에서 토큰의 유효성을 묻기 위한 요청에 따라 확인하는 기능
  @UseGuards(JwtGuard)
  @Post('verify')
  async verifyToken(@Req() request: Request) {
    const token = request.cookies['jwt'];
    try {
      const payload = await this.jwtService.verifyToken(token);
      return { message: 'Token is valid', payload };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // 2. vue에서 로그인 요청 시 아이디와 비밀번호 확인하고 새로운 토큰을 리턴하는 기능
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    try {
      // Verification of user_id and password
      const user = await this.authService.verifyUser(loginDto.user_id, loginDto.password);
      // Regenerate token and return
      const token = await this.jwtService.generateToken(user);
      response.cookie('jwt', token, { httpOnly: true });
      return { message: 'Login successful' };
    } catch (error) {
      // Notexisted user
      if (error instanceof NotFoundException) {
        throw new BadRequestException('User not found');
      // Wrong password
      } else if (error instanceof UnauthorizedException) {
        throw new BadRequestException('Invalid password');
      // Etc
      } else {
        throw error;
      }
    }
  }

  // 3. vue에서 logout 요청 시 해당 토큰을 삭제하는 기능
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}