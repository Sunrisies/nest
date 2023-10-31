import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/entities/user.entity';

@Module({
  imports: [
    LoginModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 服务器地址
      port: 9999, // 端口号
      username: 'root', // 数据库用户名
      password: '123456', // 数据库密码
      database: 'test', // 数据库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体类
      synchronize: true, // 自动同步数据库结构
    }),
    // TypeOrmModule.forFeature([User]), // 注册实体类
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
