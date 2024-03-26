// src/app.module.ts

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { AttendanceDate } from './entities/attendance-date.entity';
import { Attendance } from './entities/attendance.entity';
import { Person } from './entities/person.entity';
import { Address } from './entities/address.entity';
import { PersonAddress } from './entities/person-address.entity';
import { FamilyRelationship } from './entities/family-relationship.entity';
import { PersonTag } from './entities/person-tag.entity';
import { PersonSecretRecord } from './entities/person-secret-record.entity';
import { Department } from './entities/department.entity';
import { Class } from './entities/class.entity';
import { Role } from './entities/role.entity';
import { PersonRole } from './entities/person-role.entity';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/group-member.entity';
import { GroupRole } from './entities/group-role.entity';
import { PrayerRequest } from './entities/prayer-request.entity';
import { PrayerLog } from './entities/prayer-log.entity';
import { Post } from './entities/post.entity';
import { Image } from './entities/image.entity';
import { PostImage } from './entities/post-image.entity';
import { Tag } from './entities/tag.entity';
import { PostTag } from './entities/post-tag.entity';
import { Comment } from './entities/comment.entity';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'testdatabase-1.czcw84ge6p5t.ap-southeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'dbclqn2020',
      database: 'user_schema',
      entities: [
        User,
        AttendanceDate,
        Attendance,
        Person,
        Address,
        PersonAddress,
        FamilyRelationship,
        PersonTag,
        PersonSecretRecord,
        Department,
        Class,
        Role,
        PersonRole,
        Group,
        GroupMember,
        GroupRole,
        PrayerRequest,
        PrayerLog,
        Post,
        Image,
        PostImage,
        Tag,
        PostTag,
        Comment,
      ],
      synchronize: false,
    }),
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
