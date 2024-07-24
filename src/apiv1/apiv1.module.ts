import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { PostsController } from './controllers/posts/posts.controller';
import { UsersService } from './services/users/users.service';
import { PostsService } from './services/posts/posts.service';
import { PrismaService } from './services/prisma/prisma.service';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController, PostsController],
  providers: [UsersService, PostsService, PrismaService]
})
export class Apiv1Module {}
    