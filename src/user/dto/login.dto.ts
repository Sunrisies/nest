import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';
import { IsNotEmpty } from 'class-validator';

export class LoginDto extends PartialType(RegisterDto) {
  @IsNotEmpty()
  userName?: string;

  @IsNotEmpty()
  passWord?: string;
  type: string;
  email?: string;
  code?: string;
}
