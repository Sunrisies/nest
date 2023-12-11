import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
  Res,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  // FileFieldsInterceptor,
  // FileInterceptor,
  // FilesInterceptor,
} from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register.dto';
import { navListDto } from './dto/nav-list.dto';

import { storage } from '../uploads';
import { Response } from 'express';
import { LoginGuard } from '../login.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/nav')
  @UseGuards(LoginGuard)
  getNav(@Body() body: any) {
    console.log(11);
    return this.userService.getNav();
  }
  @Post('/register')
  register(@Body(ValidationPipe) RegisterDto: RegisterDto) {
    return this.userService.register(RegisterDto);
  }

  @Post('/login')
  async queryUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.userService.login(createUserDto, res);
  }

  @Get()
  @UseGuards(LoginGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(LoginGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('uploads')
  @UseGuards(LoginGuard)
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: { fileSize: Math.pow(1024, 2) * 2 },
      storage: storage,
    }),
  )
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
    @Req() request: any,
  ) {
    return this.userService.uploadAnyFiles(files, body, request);
  }

  @Post('/nav')
  @UseGuards(LoginGuard)
  addNav(@Body(ValidationPipe) navListDto: navListDto) {
    return this.userService.addNav(navListDto);
  }
}
