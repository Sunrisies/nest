import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Navs } from './entities/navs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Navs])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
