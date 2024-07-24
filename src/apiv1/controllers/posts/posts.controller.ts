import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostContentDto } from 'src/apiv1/dtos/PostContent.dto';
import { PostsService } from 'src/apiv1/services/posts/posts.service';
import { Blog } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  // get all posts
  @Get()
  async getAllPosts(): Promise<Blog[]> {
    return this.postService.getAllBlogs();
  }

  // post blog
  @UseGuards(AuthGuard('jwt'))  
  @Post('blog')
  @UsePipes(new ValidationPipe())
  async createBlog(@Body() blogData: PostContentDto): Promise<Blog> {
    return this.postService.createBlog(blogData);
  }

  // get a particular post
  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<Blog> {
    return this.postService.getBlogById(id);
  }

//   get all blog post by a user
  @Get(':username')
  async getBlogsByUsername(
    @Param('username') username: string,
  ): Promise<Blog[]> {
    return this.postService.getBlogsByUsername(username);
  }

//   get a articular blog post by a user
  @UseGuards(AuthGuard('jwt'))  
  @Get(':username/:id')
  async getBlogByUsernameAndId(
    @Param('username') username: string,
    @Param('id') id: number,
  ): Promise<Blog> {
    return this.postService.getBlogByUsernameAndId(username, id);
  }

}


 