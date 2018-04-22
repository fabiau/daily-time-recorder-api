import * as jwt from 'jsonwebtoken';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTokenCommand } from "./create-token.command";
import { AuthSuccessResponse } from "../responses/auth-success.response";
import { JWT_SECRET } from '../constants';
import { BaseCommandHandler } from '../../common/commands';

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler extends BaseCommandHandler<CreateTokenCommand> {

  async executeCommand(command: CreateTokenCommand) {
    const expiresIn = 60 * 60, secretOrKey = JWT_SECRET;
    const { user: { id, email, username, firstName, lastName } } = command;
    const token = jwt.sign({ id, email, username }, secretOrKey, { expiresIn });

    return new AuthSuccessResponse(expiresIn, token, {
      username,
      email,
      firstName,
      lastName
    });
  }
}