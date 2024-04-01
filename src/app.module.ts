// src/app.module.ts

// Modules
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controllers
import { AppController } from './app.controller';
// Services
import { AppService } from './app.service';
// Entities
// In atts
import { AttendanceDate } from './entities/attendance-date.entity';
import { AttendanceJUNC } from './entities/attendanceJUNC.entity';
// In part
import { Part } from './entities/group-department-part.entity';
import { Department } from './entities/group-department.entity';
import { Role } from './entities/group-role.entity';
import { RoleJUNC } from './entities/group-roleJUNCentity';
// In user
import { Address } from './entities/person-address.entity';
import { FamilyJUNC } from './entities/person-familyJUNC.entity';
import { PersonImage } from './entities/person-image.entity';
import { PersonRecord } from './entities/person-record.entity';
import { PersonTag } from './entities/person-tag.entity';
import { PersonTagJUNC } from './entities/person-tagJUNC.entity';
import { Person } from './entities/person.entity';
// In post
import { PostComment } from './entities/post-comment.entity';
import { PostImage } from './entities/post-image.entity';
import { PostTag } from './entities/post-tag.entity';
import { PostTagJUNC } from './entities/post-tagJUNC.entity';
import { Post } from './entities/post.entity';
// In auth
import { User } from './entities/user.entity';

import { ConfigModule } from '@nestjs/config';
import { PersonModule } from './person/person.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
dotenv.config();

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'testdatabase.czcw84ge6p5t.ap-southeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'dbclqn2020',
      database: 'testdatabase',
      entities: [ 
        AttendanceDate, 
        AttendanceJUNC, 
        Part, 
        Department,
        Role, 
        RoleJUNC,
        Address,
        FamilyJUNC,
        PersonImage,
        PersonRecord,
        PersonTag,
        PersonTagJUNC,
        Person,
        PostComment,
        PostImage,
        PostTag,
        PostTagJUNC,
        Post,
        User, 
      ],
      synchronize: false,
    }),
    ConfigModule.forRoot({isGlobal: true}),
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
