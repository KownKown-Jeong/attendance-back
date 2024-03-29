// src/user/services/personResistration.service.ts
import { Injectable } from '@nestjs/common';    // NEST
// Entities & Repositories
import { Address } from '@entities/person-address.entity';
import { PersonTag } from '@entities/person-tag.entity';
import { PersonTagJUNC } from '@entities/person-tagJUNC.entity'; 
import { Person } from '@entities/person.entity';
import { User } from '@entities/user.entity';
import { aPerson } from '@user/dto/sign-up.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonRegistrationService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        @InjectRepository(PersonTag)
        private readonly personTagRepository: Repository<PersonTag>,
        @InjectRepository(PersonTagJUNC)
        private readonly personTagJUNCRepository: Repository<PersonTagJUNC>,
    ) {}
    // createPerson method
    async createPerson(aPerson: aPerson, user: User | null, address: Address | null) {
        const person = this.personRepository.create({
            user: user,
            name: aPerson.name,
            gender: aPerson.gender,
            date_of_birth: aPerson.date_of_birth,
            phone_number: aPerson.phone_number,
            address: address,
        });
        const savedPerson = await this.personRepository.save(person);

        // Tagging method
        for (const tagName of aPerson.tags) {
            // Tag search : Check if the tag already exists
            let tag = await this.personTagRepository.findOne({ where: { name: tagName } });

            // If the tag doesn't exist, create a new one
            if (!tag) {
                tag = this.personTagRepository.create({ name: tagName });
                tag = await this.personTagRepository.save(tag);
            }

            // Tagging : Create a new PersonTagCNT entity to establish the relationship
            const personTagCNT = this.personTagJUNCRepository.create({
                person: savedPerson,
                tag: tag,
            });
            await this.personTagJUNCRepository.save(personTagCNT);
        }

        return savedPerson;
    }
}