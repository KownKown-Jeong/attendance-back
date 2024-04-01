import { Injectable } from '@nestjs/common';

// Services
import { AddressResistrationService } from './services/address-resistration.service';
import { FamilyResistrationService } from './services/family-resistration.service';
import { PersonResistrationService } from './services/person-resistration.service';

// Typedefines for parameters
import { SignUpDto } from '@dto/sign-up.dto';
import { User } from '@entities/user.entity';

@Injectable()
export class PersonService {
    constructor(
        private readonly addressResistrationService: AddressResistrationService,
        private readonly personResistrationService: PersonResistrationService,
        private readonly familyResistrationService: FamilyResistrationService,
    ) {}

    // Person registration method
    async create(signUpDto: SignUpDto, user: User){

        const { aPerson, familyMembers } = signUpDto;
        // Address registration
        const newaddress = await this.addressResistrationService.create(aPerson.address);

        // Person registration
        const newperson = await this.personResistrationService.create(user, aPerson, newaddress);

        // Family registration
        await this.familyResistrationService.create(familyMembers, newaddress, newperson);
    }
}
