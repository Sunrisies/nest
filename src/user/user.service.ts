import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(CreateUserDto: CreateUserDto) {
    const { userName, passWord } = CreateUserDto;
    if (!userName) {
      return {
        code: 200,
        message: '请输入正确的用户名',
      };
    }
    if (!passWord) {
      return {
        code: 200,
        message: '密码不存在',
      };
    }
    // 在添加之前，先进行查询，如果存在就提示用户，当前已经存在，请换一个用户名
    const query1 = `select * from Users where userName = '${userName}'`;
    const result = await this.userRepository.query(query1);
    if (result.length > 0) {
      return {
        code: 200,
        message: '当前已经存在，请换一个用户名',
      };
    }
    const query2 = `insert into Users (userName, passWord) values ('${userName}', '${passWord}')`;
    console.log(query2, 'CreateUserDto');

    return await this.userRepository.query(query2);
  }
  // 获取所有用户数据列表(userRepository.query()方法属于typeoram)
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.query('select * from user');
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
