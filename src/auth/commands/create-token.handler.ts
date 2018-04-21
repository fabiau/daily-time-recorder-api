import * as jwt from 'jsonwebtoken';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTokenCommand } from "./create-token.command";
import { AuthSuccessResponse } from "../responses/auth-success.response";
import { JWT_SECRET } from '../constants';

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {

  async execute(command: CreateTokenCommand, resolve: (value?) => void) {
    const expiresIn = 60 * 60, secretOrKey = JWT_SECRET;
    const { id, email, username } = command;
    const token = jwt.sign({ id, email, username }, secretOrKey, { expiresIn });

    resolve(new AuthSuccessResponse(expiresIn, token));
  }
}