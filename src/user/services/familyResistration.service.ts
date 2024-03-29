// src/user/services/familyResistration.service.ts
import { Injectable } from '@nestjs/common';    // NEST
// Entities & Repositories
import { Address } from '@entities/person-address.entity';
import { FamilyJUNC } from '@entities/person-familyJUNC.entity';
import { Person } from '@entities/person.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FamilyRelationType } from '@common/enums';
// Services
import { PersonRegistrationService } from '@user/services/personResistration.service';
import { familyMembers } from '@user/dto/sign-up.dto';


@Injectable()
export class FamilyRegistrationService {
    constructor(
        @InjectRepository(FamilyJUNC)
        private readonly familyJUNCRepository: Repository<FamilyJUNC>,
        private readonly personRegistrationService: PersonRegistrationService,
    ) {}

    // createFamily method
    async createFamily(familyMembers: familyMembers[], person: Person, address: Address | null) {
        for(const member of familyMembers){
            // newPerson registration
            const newPerson = await this.personRegistrationService.createPerson(member.aPerson, null, address);

            let parenT = null;
            let chilD = null;
            let relationtypE = null;
            switch (member.relationship) {
                case 'father' || 'mother' || 'father_in_law' || 'mother_in_law' :
                    parenT: newPerson;
                    chilD: person;
                    relationtypE: FamilyRelationType.PARENT;
                    break;
                case 'son' || 'daughter' :
                    parenT: person;
                    chilD: newPerson;
                    relationtypE: FamilyRelationType.PARENT;
                    break;
                case 'husband' || 'wife' :
                    parenT: newPerson;
                    chilD: person;
                    relationtypE: FamilyRelationType.SPOUSE;
                    break;
                case 'sister' || 'brother' || 'younger_sister' || 'younger_brother' :
                    parenT: person;
                    chilD: newPerson;
                    relationtypE: FamilyRelationType.SIBLING;
                    break;
                case 'friend' :
                    parenT: person;
                    chilD: newPerson;
                    relationtypE: FamilyRelationType.FRIEND;
                    break;
                default:
                    parenT: person;
                    chilD: newPerson;
                    relationtypE: FamilyRelationType.ETC;
                    break;
            }
            // check relationship between person and newPerson
            const family = this.familyJUNCRepository.create({
                parent: parenT,
                child: chilD,
                relationType: relationtypE,
            });
            await this.familyJUNCRepository.save(family);
        }
    }
}