import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(userInfo: AuthDto) {
    try {
      const hashPassword = await argon.hash(userInfo.password);
      const user = await this.prisma.users.create({
        data: {
          ...userInfo,
          password: hashPassword,
        },
        select: {
          email: true,
          id: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('already taken');
        }
      }

      throw new Error(error);
    }
  }

  async signin(userInfo: AuthDto) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: userInfo.email,
        },
      });

      const matcheHashed = await argon.verify(user.password, userInfo.password);

      if (!matcheHashed) {
        const errorG = new ForbiddenException('user and password missmatch!');
        return errorG.getResponse();
      }

      if (!user) return new ForbiddenException('Not Found');
      const token = await this.createToken({ id: user.id, email: user.email });
      return token;
    } catch (error) {
      throw new ForbiddenException('user and password not match');
    }
  }

  async createToken({ id, email }): Promise<{ access_token: string }> {
    const payload = { sub: id, email: email };
    const secret = this.config.get('SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  }
}
