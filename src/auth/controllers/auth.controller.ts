import { Controller, Post, Body, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginRequest } from '../requests/user-login.request';
import { RegisterUserRequest } from '../requests/register-user.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userLoginRequest: UserLoginRequest) {
    return await this.authService.login(userLoginRequest);
  }

  @Post('register')
  async register(@Body() request: RegisterUserRequest) {
    return await this.authService.register(request);
  }
}