// src/modules/auth/auth.controller.ts
// The AuthController(Main) used to handle auth routes 
// which has verifyToken, login, signup, logout.

// Imports (Self/Module/Controller/Service)
import { UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { UserService } from '@modules/user/user.service';
import { PersonService } from '@modules/person/person.service';
import { Request, Response } from 'express';

// Data Transfer Object Class
import { LoginDto } from '@dto/login.dto';
import { SignUpDto } from '@dto/sign-up.dto';

// Controller for auth
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,    
    private readonly personService: PersonService,
  ) {}
  // 1. vue에서 토큰의 유효성을 묻기 위한 요청에 따라 확인하는 기능
  @Post('verify')
  async verifyToken(@Req() request: Request) {
    const token = request.cookies['jwt'];
    try {
      const payload = await this.jwtService.verify(token);
      return { message: 'Token is valid', payload };
    } catch (error) { throw new UnauthorizedException('Invalid token'); }
  }

  // 2. vue에서 로그인 요청 시 아이디와 비밀번호 확인하고 새로운 토큰을 리턴하는 기능
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    try {
      // Verification of user_id and password
      const user = await this.userService.checkIdPw(loginDto.user_id, loginDto.password);
      // Regenerate token and return
      const token = await this.jwtService.create(user);
      response.cookie('jwt', token, { httpOnly: true });
      return { message: 'Login successful' };
    } catch (error) {
      if (error instanceof NotFoundException) { throw new BadRequestException('User not found'); // Notexisted user
      } else if (error instanceof UnauthorizedException) { throw new BadRequestException('Invalid password'); // Wrong password
      } else { throw error; // Etc
      }
    }
  }

  // 3. vue에서 회원가입 요청 시 회원가입을 진행하고 새로운 토큰을 리턴하는 기능
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) response: Response) {
    try {
      const { aPerson, password } = signUpDto;
      // Create a new user
      const newuser = await this.userService.create(aPerson.phone_number, password);
      // Create a new person and junction with user
      await this.personService.create(signUpDto, newuser);
      // Regenerate token and return
      const token = await this.jwtService.create(newuser);
      response.cookie('jwt', token, { httpOnly: true });
      return { message: 'Signup successful' };
    } catch (error) {
      throw error;
    }
  }

  // 4. vue에서 logout 요청 시 해당 토큰을 삭제하는 기능
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}