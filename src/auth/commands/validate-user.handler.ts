import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ValidateUserCommand } from "./validate-user.command";
import { UsersService } from "../../users/services/users.service";

@CommandHandler(ValidateUserCommand)
export class ValidateUserHandler implements ICommandHandler<ValidateUserCommand> {
  constructor(private readonly usersService: UsersService) {}

  async execute(command: ValidateUserCommand, resolve: (value?) => void) {
    resolve(true);
  }
}