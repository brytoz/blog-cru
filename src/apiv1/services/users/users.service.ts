import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDetailsType, UserLoginDetailsType } from 'src/apiv1/utils/types';
import { LoginUserDto } from 'src/apiv1/dtos/loginUser.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  //   register a user
  async createUser(userInfo: UserDetailsType): Promise<User> {
    const { username, password, email } = userInfo;
    const check = await this.prisma.user.findUnique({
      where: { username },
    });

    console.log(check.email);
    if (check.username == username) {
      throw new ConflictException('Name already exist');
    }

    if (check.email == email) {
      throw new ConflictException('Email already exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
  }

  //   validation
  async validateUser(userInfo: UserLoginDetailsType): Promise<User> {
    const { username, password } = userInfo;
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const {username,password} = user
   const userData = await this.prisma.user.findUnique({
        where: { username },
      });
  
      if(!userData){
        throw new NotFoundException("User not found!")
      }

      if (await bcrypt.compare(password, userData.password)) {
        throw new UnauthorizedException("Invalid Credentials!")
      }
      
    const payload = { username: user.username, };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
