// src/auth/auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '@entities/user.entity';
import { Person } from '@entities/person.entity';
import { Address } from '@entities/address.entity';
import { FamilyRelationship } from '@entities/family-relationship.entity';
import { Tag } from '@entities/tag.entity';
import { PersonTag } from '@entities/person-tag.entity';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(FamilyRelationship)
    private readonly familyRelationshipRepository: Repository<FamilyRelationship>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(PersonTag)
    private readonly personTagRepository: Repository<PersonTag>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { phoneNumber, password, name, gender, dateOfBirth, address } = signUpDto;

    // 이미 존재하는 전화번호인지 확인
    const existingUser = await this.userRepository.findOne({ 
      where: { phone_number: phoneNumber } 
    });
    if (existingUser) {
      throw new BadRequestException('이미 존재하는 전화번호입니다.');
    }

    // 비밀번호 해시 처리
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 정보 저장
    const user = this.userRepository.create({
      phone_number: phoneNumber,
      password_hash: hashedPassword,
    });
    await this.userRepository.save(user);
    
    // 주소 정보 저장
    const newAddress = this.addressRepository.create({
      street: address,
    });
    await this.addressRepository.save(newAddress);
    
    // 본인(Person) 정보 저장
    const person = this.personRepository.create({
      user_id: user.id,     // user_id 값 할당
      name,
      gender,
      date_of_birth: dateOfBirth,
      user,
      address: newAddress, // 주소 엔티티와 연결
      profile_image_id: 0,  // profile_image_id 값 할당 (필요한 경우)
    });
    await this.userRepository.save(person);

    for (const familyMember of signUpDto.familyMembers) {
      const { name, gender, dateOfBirth, relationship, phoneNumber, tags } = familyMember;
  
      // 가족 구성원 정보 저장
      const familyPerson = this.personRepository.create({
        name,
        gender,
        date_of_birth: dateOfBirth,
        profile_image_id: 0,
        address: newAddress,
      });
      await this.personRepository.save(familyPerson);
  
      // 가족 관계 저장
      const familyRelationship = this.familyRelationshipRepository.create({
        person_id: person.id,
        related_person_id: familyPerson.id,
        relationship_type: relationship,
      });
      await this.familyRelationshipRepository.save(familyRelationship);
     
      // 가족 구성원의 전화번호 처리
      if (phoneNumber) {
        const existingFamilyUser = await this.userRepository.findOne({
          where: { phone_number: phoneNumber },
        });
        
        if (existingFamilyUser) {
          // 이미 존재하는 사용자인 경우 Person 엔티티와 연결
          familyPerson.user = existingFamilyUser;
        } else {
          // 없을 경우 새로운 사용자 생성, 비번은 'secret' hash로 저장
          const hashedPassword = await bcrypt.hash('secret', 10);
          const familyUser = this.userRepository.create({
            phone_number: phoneNumber,
            password_hash: hashedPassword,
          });
          await this.userRepository.save(familyUser);
          familyPerson.user = familyUser;
        }
      }
      // 가족 구성원의 태그 처리
      if (tags && tags.length > 0) {
        const personTags = [];

        for (const tagName of tags) {
          let tag = await this.tagRepository.findOne({ where: { name: tagName } });
          // 동일 tag가 존재하는지 확인 후 없으면 생성
          if (!tag) {
            tag = this.tagRepository.create({ name: tagName });
            await this.tagRepository.save(tag);
          }
          // PersonTag 엔티티 생성
          const personTag = this.personTagRepository.create({
            person_id: familyPerson.id,
            tag_id: tag.id,
          });
          // PersonTag stack에 저장
          personTags.push(personTag);
        }
        // PersonTag 엔티티 저장
        await this.personTagRepository.save(personTags);
      }
    }

    // JWT 토큰 생성
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}