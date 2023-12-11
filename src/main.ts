import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // 设置全局前缀
  app.setGlobalPrefix('api');
  const port = 3000;
  await app.listen(port, () => {
    console.log(`服务启动成功，端口:${port}`);
  });
}
bootstrap();
