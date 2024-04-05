// src/app.module.ts

// Imports (Self/Module/Controller/Service)
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { PersonModule } from '@modules/person/person.module';
import { PostModule } from '@modules/post/post.module';
import { UserModule } from '@modules/user/user.module';
import { AppService } from './app.service';
// Entities
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { PostBody } from './entities/post-body.entity';
// In auth
import { User } from './entities/user.entity';


import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
dotenv.config();

@Module({
  imports: [
    AuthModule,
    PersonModule,
    PostModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'testdatabase-1.cpqwe02ik94o.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'dbclqn2020',
      database: 'testdatabase-1',
      entities: [ 
        AttendanceDate, AttendanceJUNC, 
        Part, Department,Role, RoleJUNC,
        Address, FamilyJUNC, PersonImage, PersonRecord, PersonTag, PersonTagJUNC, Person,
        PostComment, PostImage, PostTag, PostTagJUNC, PostBody,
        User, 
      ],
      synchronize: false,
    }),
    ConfigModule.forRoot({isGlobal: true}),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
