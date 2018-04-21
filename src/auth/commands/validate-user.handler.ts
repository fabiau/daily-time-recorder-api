import { CommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ValidateUserCommand } from "./validate-user.command";
import { BaseCommandHandler } from "../../common/commands";
import { User } from "../../users/entities/user.entity";

@CommandHandler(ValidateUserCommand)
export class ValidateUserHandler extends BaseCommandHandler<ValidateUserCommand> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super();
  }

  async executeCommand(command: ValidateUserCommand) {
    const { id } = command;
    const user = await this.userRepository.findOne({ id });
    return Boolean(user);
  }
}