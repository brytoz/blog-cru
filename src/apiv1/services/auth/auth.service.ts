import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDetailsType } from 'src/apiv1/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(userInfo: UserLoginDetailsType): Promise<any> {
    const user = await this.userService.validateUser(userInfo);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(user:  any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
