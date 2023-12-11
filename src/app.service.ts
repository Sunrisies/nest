import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { platform } from 'os';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  restartServer() {
    process.exit(1); // 使用一个非零的退出码来表示错误
    throw new Error('错误消息');

    console.log(111);
    const command = platform() === 'win32' ? 'npm.cmd' : 'npm';
    const args = ['run', 'start'];
    console.log(platform(), 'command');
    const newProcess = exec(`${command} ${args.join(' ')}`);
    // console.log(newProcess, '===');
    // 终止当前进程
    process.exit();
  }
}
