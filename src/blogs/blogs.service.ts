import { JwtGuard } from './../auth/guard/jwt.guard';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}
  getBlogs() {
    return { blogs: 'ok' };
  }
}
