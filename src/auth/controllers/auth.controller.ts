import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginRequest } from '../requests/user-login.request';
import { RegisterUserRequest } from '../requests/register-user.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginRequest: UserLoginRequest) {
      // return await this.authService.createToken(userLoginRequest);
  }

  @Post('register')
  async register(@Body() request: RegisterUserRequest) {
    return await this.authService.register(request);
  }

  @Get('authorized')
  async authorized() {
    return 'You are authorized!!';
  }
}