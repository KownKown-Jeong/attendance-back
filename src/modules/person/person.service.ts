// src/modules/person/person.service.ts
// The PersonService service(Main) used to handle person-related operations 
// which which has create, getPersonByUserID.

// Imports (Self/Module/Controller/Service)
import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressResistrationService } from './services/address-resistration.service';
import { FamilyResistrationService } from './services/family-resistration.service';
import { PersonResistrationService } from './services/person-resistration.service';
import { UserService } from '@modules/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Typedefines for parameters
import { SignUpDto } from '@dto/sign-up.dto';
import { User } from '@entities/user.entity';
import { Person } from '@entities/person.entity';

Injectable()
export class PersonService {
    constructor(
        private readonly addressResistrationService: AddressResistrationService,
        private readonly personResistrationService: PersonResistrationService,
        private readonly familyResistrationService: FamilyResistrationService,
        private readonly userService: UserService,
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) {}

    // Person registration method
    async create(signUpDto: SignUpDto, user: User){
        const { aPerson, familyMembers } = signUpDto;
        const newaddress = await this.addressResistrationService.create(aPerson.address); // Address registration
        const newperson = await this.personResistrationService.create(user, aPerson, newaddress); // Person registration
        await this.familyResistrationService.create(familyMembers, newaddress, newperson); // Family registration
    }

    async getPersonByUserId(user_id: string): Promise<Person> {
        // Find User by user_id
        const user = await this.userService.findUser(user_id);
        // Find person by User
        const person = await this.personRepository.findOne({ where: { user: user } });
        if (!person) { throw new NotFoundException('Person not found'); }
        return person;
      }
}
