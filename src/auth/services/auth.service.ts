import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { AuthSuccessResponse } from '../responses/auth-success.response';
import { UserLoginRequest } from '../requests/user-login.request';
import { JWT_SECRET } from '../constants';
import { UsersService } from '../../users/services/users.service';
import { ClientUserInformation } from '../interfaces/client-user-information';
import { CommandBus } from '@nestjs/cqrs';
import { ValidateUserCommand } from '../commands/validate-user.command';
import { CreateTokenCommand } from '../commands/create-token.command';

@Component()
export class AuthService {
  constructor (private readonly commandBus: CommandBus) {

  }

  async createToken(userLoginRequest: UserLoginRequest): Promise<AuthSuccessResponse> {
    return await this.commandBus.execute(
      new CreateTokenCommand(1, 'admin', 'admin@admin.io')
    );
  }

  async validateUser(signedUser): Promise<boolean> {
    return Boolean(await this.commandBus.execute(
      new ValidateUserCommand(signedUser as ClientUserInformation)
    ));
  }
}