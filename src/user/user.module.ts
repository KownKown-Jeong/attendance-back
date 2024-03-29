// src/user/user.module.ts
// if you want to use any service from other module with the providers, 
//  1. Add the service & included Entities in the imports.
//  2. Add Entities at TypeOrmModule.forFeature([Here]).
//  3. Add it in the providers.
// but if internal use, don't.
// NEST
import { ConfigModule } from '@nestjs/config';
// Entities & Repositories
import { User } from '@entities/user.entity';
import { Address } from '@entities/person-address.entity';
import { Person } from '@entities/person.entity';
import { FamilyJUNC } from '@entities/person-familyJUNC.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// Modules
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { AuthModule } from './address/address.module';     -- Not yet, for jwt token
// Controllers
import { UserController } from './user.controller';
// Services
import { UserService } from './services/signUp.service';
import { PersonRegistrationService } from './services/personResistration.service';
import { FamilyRegistrationService } from './services/familyResistration.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Address, Person, FamilyJUNC]),
    PassportModule,
    PersonRegistrationService,
    FamilyRegistrationService,
    //AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, PersonRegistrationService, FamilyRegistrationService],
})
export class AuthModule {}