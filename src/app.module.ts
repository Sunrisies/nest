import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// import { User } from './user/entities/user.entity';
import { ArticleModule } from './article/article.module';
import { createClient } from 'redis';

@Module({
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            port: 6379,
            host: 'localhost',
          },
        });
        await client.connect();
        return client;
      },
    },
  ],

  controllers: [AppController],
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 服务器地址
      port: 3306, // 端口号
      username: 'root', // 数据库用户名
      password: '123456', // 数据库密码
      database: 'test', // 数据库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体类
      synchronize: true, // 自动同步数据库结构
    }),
    JwtModule.register({
      global: true,
      secret: 'guang',
      signOptions: { expiresIn: '7d' },
    }),
    ArticleModule,
    // TypeOrmModule.forFeature([User]), // 注册实体类
  ],
})
export class AppModule {}
