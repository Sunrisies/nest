import { Injectable, HttpException, Logger, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { Navs } from './entities/navs.entity';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { info } from '../login.guard';
import { staticFolder } from '../uploads';
import { navListDto } from './dto/nav-list.dto';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Navs)
    private readonly navListRepository: Repository<Navs>,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  private logger = new Logger();
  async register(RegisterDto: RegisterDto) {
    if (!RegisterDto.userName) {
      return {
        code: 200,
        message: '请输入正确的用户名',
      };
    }
    if (!RegisterDto.passWord) {
      return {
        code: 200,
        message: '密码不存在',
      };
    }
    const foundUser = await this.userRepository.findOneBy({
      userName: RegisterDto.userName,
    });
    if (foundUser) {
      throw new HttpException('用户已存在', 200);
    }
    RegisterDto.passWord = md5(RegisterDto.passWord);
    // 删除空值的非必填字段
    Object.keys(RegisterDto).forEach((key) => {
      if (!RegisterDto[key] && key !== 'userName' && key !== 'passWord') {
        delete RegisterDto[key];
      }
    });
    try {
      const sql = `insert into users (userName, passWord,image,phone,email) values ('${RegisterDto?.userName}', '${RegisterDto?.passWord}','${RegisterDto?.image}','${RegisterDto?.phone}','${RegisterDto?.email}')`;
      console.log(sql, await this.userRepository.query(sql));

      const res = await this.userRepository.query(sql);
      if (!res) {
        return { code: 200, message: '注册失败' };
      }
      return {
        code: 200,
        message: '注册成功',
      };
    } catch (e) {
      this.logger.error(e, UserService);
      return { code: 200, message: '注册失败' };
    }
  }
  async findAll(): Promise<any> {
    const res = await this.userRepository.query('select * from users');
    if (!res) {
      return {
        code: 200,
        message: '暂无数据',
      };
    }
    return {
      code: 200,
      data: res,
      message: '获取成功',
    };
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

  async uploadAnyFiles(files, body, request) {
    console.log('CreateUserDto', files[0]);
    const host = 'http://chaoyang1024.top';
    console.log(staticFolder, 'staticFolder', info);
    const url = `${host}:3000/${staticFolder}/${files[0].filename}`;
    const sql = `UPDATE users SET image = '${url}' WHERE id = ${info.user.id}`;
    const res = await this.userRepository.query(sql);
    return {
      code: 200,
      message: '上传成功',
      url,
    };
  }

  async login(createLoginDto: CreateUserDto, res) {
    // 查询数据库中是否存在当用户
    const { userName, passWord } = createLoginDto;
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
    const sql = 'SELECT * FROM users WHERE userName = ?';
    const [user] = await this.userRepository.query(sql, [userName]);

    if (user) {
      if (user.passWord !== md5(passWord)) {
        throw new HttpException('密码错误', 200);
      }
      const token = await this.jwtService.signAsync({
        user: {
          id: user.id,
          username: user.username,
        },
      });

      res.setHeader('token', token);
      return {
        code: 200,
        data: { ...user, token },
        message: '登录成功',
      };
    }

    return {
      code: 200,
      message: '用户不存在',
    };
  }
  async addNav(navListDto: navListDto) {
    const { label, key } = navListDto;
    try {
      const sql = `insert into navs (label, path) values ('${label}', '${key}')`;
      console.log(sql);
      const res = await this.navListRepository.query(sql);
      if (!res) {
        return { code: 200, message: '添加失败' };
      }
      return {
        code: 200,
        message: '添加成功',
      };
    } catch (e) {
      this.logger.error(e, UserService);
      return { code: 200, message: '添加失败' };
    }
  }

  async getNav() {
    const sql = 'SELECT label, path  FROM navs';
    console.log(sql);
    let res = await this.navListRepository.query(sql);
    console.log(res, 'res');

    if (!res) {
      return {
        code: 200,
        message: '查询失败',
      };
    }
    res = res.map((item) => ({ label: item.label, key: item.path }));
    return {
      code: 200,
      message: '查询成功',
      data: res,
    };
  }
}
