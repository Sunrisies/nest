import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
@Injectable()
export class AppService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;
  async getHello() {
    const keys = await this.redisClient.keys('*');
    console.log(keys, 'keys');
    return 'Hello World!';
  }
  restartServer() {
    return '你好啊';
  }
}
