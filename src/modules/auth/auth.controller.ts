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
    // verifyToken: Verify the token and return the payload
    @Post('verify')
    async verifyToken(@Req() request: Request) {
        const token = request.cookies['jwt'];
        try {
            const payload = await this.jwtService.verify(token);
            return { message: 'Token is valid', payload };
        } catch (error) { throw new UnauthorizedException('Invalid token'); }
    }

    // login: Verify the user_id and password and return the new token
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

    // signup: Create a new user and return the new token
    @Post('signup')
    async signup(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) response: Response) {
        try {
            const { aPerson, password } = signUpDto;
            
            const existingUser = await this.userService.findUser(aPerson.phone_number);       // Check if the id is already in use
            if (existingUser) { throw new BadRequestException('User already exists'); }
            
            let person  = null;
            person = await this.personService.getPersonByPhoneNumber(aPerson.phone_number);   // Check if the person already exists
            if(!person) { person = await this.personService.create(signUpDto); }              // Create a new person when not exists
            
            const newuser = await this.userService.create(aPerson.phone_number, person, password);  // Create a new user
            
            const token = await this.jwtService.create(newuser);                              // Regenerate token and return
            response.cookie('jwt', token, { httpOnly: true });                                // Set the token in the cookie
            return { message: 'Signup successful' };                                          // Return the message 
        } catch (error) {
            throw error;
        }
    }

    // logout: Clear the token in the cookie
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return { message: 'Logout successful' };
    }
}