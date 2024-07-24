import {
  Controller,
  Post,
  Get,
  Body, 
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/apiv1/dtos/CreateUser.dto';
import { LoginUserDto } from 'src/apiv1/dtos/loginUser.dto';
import { UsersService } from 'src/apiv1/services/users/users.service';
import { AuthService } from '../../services/auth/auth.service'; 

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  //   not in use
  @Get()
  getAllUsers() {
    const allusers = [{ username: 'unauthorized' }];
    return allusers;
  }


  //   login a userr
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginData: LoginUserDto) { 
    const user = await this.authService.validateUser(loginData);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  //   register a userr
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() CreateUserData: CreateUserDto) {
    return this.userService.createUser(CreateUserData);
  }
}


