import { Controller, Post, Body, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginRequest } from '../requests/user-login.request';
import { RegisterUserRequest } from '../requests/register-user.request';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged successfully. Returns authenticated users information and token with expiration.'})
  @ApiResponse({ status: 400, description: 'Request body is invalid or username/password is incorrect.'})
  async login(@Body() userLoginRequest: UserLoginRequest) {
    return await this.authService.login(userLoginRequest);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully.'})
  @ApiResponse({ status: 400, description: 'Request body is invalid or e-mail and/or username already in use.'})
  async register(@Body() request: RegisterUserRequest) {
    return await this.authService.register(request);
  }
}