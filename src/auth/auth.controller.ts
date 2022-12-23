import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signup')
  signup(@Body() userInfo: AuthDto) {
    return this.AuthService.signup(userInfo);
  }

  @Post('signin')
  sigin(@Body() userInfo: AuthDto) {
    return this.AuthService.signin(userInfo);
  }
}
