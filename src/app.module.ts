import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    LoginModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 服务器地址
      port: 3306, // 端口号
      username: '', // 数据库用户名
      password: '', // 数据库密码
      database: 'test', // 数据库名
      entities: [User], // 实体类
      synchronize: true, // 自动同步数据库结构
    }),
    TypeOrmModule.forFeature([User]), // 注册实体类
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
