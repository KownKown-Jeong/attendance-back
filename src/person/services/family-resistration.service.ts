import { Injectable } from '@nestjs/common';
import { FamilyRelationType } from '@common/enums';

// Entities for injectRepositories
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilyJUNC } from '@entities/person-familyJUNC.entity';

// Services
import { PersonResistrationService } from './person-resistration.service';

// Typedefines for parameters
import { familyMembers } from '@dto/sign-up.dto';
import { Address } from '@entities/person-address.entity';
import { Person } from '@entities/person.entity';

@Injectable()
export class FamilyResistrationService {
    
    constructor(
        private readonly personResistrationService: PersonResistrationService,
        @InjectRepository(FamilyJUNC)
        private readonly familyJUNCRepository: Repository<FamilyJUNC>,
    ) {}

    async create(familyMembers: familyMembers[], address: Address | null, person: Person) {
        for(const member of familyMembers){
            // newPerson registration
            const newPerson = await this.personResistrationService.create(null, member.aPerson, address);

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
