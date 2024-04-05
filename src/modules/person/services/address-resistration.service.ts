// Purpose: Service for address registration.
// The AddressResistrationService used to register new address.

// Imports (Self/Module/Controller/Service)
import { Injectable, BadRequestException } from '@nestjs/common';
// Entities for injectRepositories
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '@entities/person-address.entity';

@Injectable()
export class AddressResistrationService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
    ) {}
    // Address registration method
    async create(address: string): Promise<Address | null>{
        let newAddress :Address = null;      // Address entity
        if(address) {
            // check if the address already exists
            const existingAddress = await this.addressRepository.findOne({ 
                where: { street: address } 
            });
            if (existingAddress) { throw new BadRequestException('이미 존재하는 주소입니다.'); }
            // save address
            newAddress = this.addressRepository.create({ 
                street: address,
            });
            await this.addressRepository.save(newAddress);
        }
        return newAddress;
    }
}
