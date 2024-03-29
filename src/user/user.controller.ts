// src/user/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';  // Controller, Post, Body
import { UserService } from './services/signUp.service';  // Service
import { SignUpDto } from './dto/sign-up.dto';            // DTO Class

@Controller('user')                                       // Controller == Endpoint
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')                                         // POST /user/signup
  async signUp(@Body() signUpDto: SignUpDto) {            // signUp method : Request Body with SignUpDto
    return this.userService.signUp(signUpDto);
  }
}