import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    BlogsModule,
  ],
})
export class AppModule {}
