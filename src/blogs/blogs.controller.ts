import { BlogsService } from './blogs.service';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { Controller, UseGuards, Get } from '@nestjs/common';

@UseGuards(JwtGuard)
@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Get()
  getBlogs() {
    return this.blogService.getBlogs();
  }
}
