import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginRequest } from '../requests/user-login.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginRequest: UserLoginRequest) {
      return await this.authService.createToken(userLoginRequest);
  }

  @Get('authorized')
  async authorized() {
    return 'You are authorized!!';
  }
}