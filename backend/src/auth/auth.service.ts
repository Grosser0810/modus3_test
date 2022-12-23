import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Payload } from '../types/payload';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }

  async findByEmail(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        'incorrect email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.userService.sanitizeUser(user);
    } else {
      throw new HttpException(
        'incorrect email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
