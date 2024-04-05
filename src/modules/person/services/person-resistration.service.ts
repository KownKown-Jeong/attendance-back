// src/modules/person/services/person-resistration.service.ts
// The PersonResistrationService used to register a new person.

// Imports (Self/Module/Controller/Service)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '@entities/person.entity';

// Typedefines for parameters
import { Address } from '@entities/person-address.entity';
import { User } from '@entities/user.entity';
import { aPerson } from '@dto/sign-up.dto';

@Injectable()
export class PersonResistrationService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) {}
    async create(aPerson: aPerson, address: Address | null) {
        const person = this.personRepository.create({
            name: aPerson.name,
            gender: aPerson.gender,
            date_of_birth: aPerson.date_of_birth,
            phone_number: aPerson.phone_number,
            address: address,
        });
        const newperson = await this.personRepository.save(person);

/*
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
*/

        return newperson;
    }
}
