// src/modules/person/person.module.ts

// Imports (Self/Module/Controller/Service)
import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { UserModule } from '@modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '@entities/person-address.entity';
import { FamilyJUNC } from '@entities/person-familyJUNC.entity';
import { Person } from '@entities/person.entity';
import { AddressResistrationService } from './services/address-resistration.service';
import { PersonResistrationService } from './services/person-resistration.service';
import { FamilyResistrationService } from './services/family-resistration.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Address, FamilyJUNC, Person]),
  ],
  controllers: [PersonController],
  providers: [PersonService, AddressResistrationService, PersonResistrationService, FamilyResistrationService],
  exports: [PersonService]
})
export class PersonModule {}