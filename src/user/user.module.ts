import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Navs } from './entities/navs.entity';
import { RedisModule } from 'src/redis/redis.module';
@Module({
  imports: [TypeOrmModule.forFeature([Users, Navs]), RedisModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
