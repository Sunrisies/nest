import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/*重点*/
import { urlencoded, json } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // 设置全局前缀
  app.setGlobalPrefix('api');
  /*重点*/
  app.use(json({ limit: '50mb' }));
  /*重点*/
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const port = 3000;
  await app.listen(port, () => {
    console.log(`服务启动成功，端口:${port}`);
  });
}
bootstrap();
