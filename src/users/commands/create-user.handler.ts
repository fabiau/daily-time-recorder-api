import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async execute(command: CreateUserCommand, resolve: (value?) => void) {
    const { username, password, email, firstName, lastName } = command;
    const user = this.userRepository.create({
      username,
      password,
      email,
      firstName,
      lastName
    });

    resolve(user);
  }
}