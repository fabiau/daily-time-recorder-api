import * as jwt from 'jsonwebtoken';
import { Component, UnauthorizedException } from '@nestjs/common';
import { AuthSuccessResponse } from '../responses/auth-success.response';
import { UserLoginRequest } from '../requests/user-login.request';
import { JWT_SECRET } from '../constants';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTokenCommand } from '../commands/create-token.command';
import { User } from '../../users/entities/user.entity';
import { RegisterUserRequest } from '../requests/register-user.request';
import { CreateUserCommand } from '../../users/commands/create-user.command';
import { BaseService } from '../../common/services/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { passwordEncrypt } from '../../common/utils/encryption';

@Component()
export class AuthService extends BaseService {
  constructor (
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    commandBus: CommandBus) {
    super(commandBus);
  }

  async register(request: RegisterUserRequest) {
    const { username, password, email, firstName, lastName } = request;
    const createdUser = await this.executeCommand(
      new CreateUserCommand(username, password, email, firstName, lastName)
    );
    return await this.createToken(createdUser);
  }

  async login(request: UserLoginRequest) {
    const { username, password } = request;
    const user = await this.userRepository.findOne(
      { username, password: passwordEncrypt(password) }
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.createToken(user);
  }

  async createToken(user: User): Promise<AuthSuccessResponse> {
    return await this.executeCommand(
      new CreateTokenCommand(user)
    );
  }

  async validateUser(signedUser): Promise<boolean> {
    return Boolean(await this.userRepository.findOne({ id: signedUser.id }));
  }
}