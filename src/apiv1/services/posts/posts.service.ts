import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Blog, User } from '@prisma/client';
import { PostContentType } from 'src/apiv1/utils/types';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

// post blogs service
  async createBlog(postDetails:PostContentType): Promise<Blog> {
    const { username, content, image } = postDetails;

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.blog.create({
      data: {
        username,
        content,
        image,
        userId: user.id,
      },
    });
  }

   // get all blogs service
  async getAllBlogs(): Promise<Blog[]> {
    return this.prisma.blog.findMany();
  }

   // get all blogs servic by id
  async getBlogById(id: number): Promise<Blog> {
    return this.prisma.blog.findUnique({
      where: { id },
    });
  }

   // get all blogs service by usernae
   async getBlogsByUsername(username: string): Promise<Blog[]> {
    return this.prisma.blog.findMany({
      where: { username },
    });
  }

   // get all blogs service by usernaem and id
  async getBlogByUsernameAndId(username: string, id: number): Promise<Blog> {
    return this.prisma.blog.findFirst({
      where: { username, id },
    });
  }
}
