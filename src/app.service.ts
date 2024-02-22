import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  async getHello() {
    return 'Hello World!';
  }
  restartServer() {
    return '你好啊';
  }
}
