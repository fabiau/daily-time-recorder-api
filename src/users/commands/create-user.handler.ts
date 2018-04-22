import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { BaseCommandHandler } from "../../common/commands";
import { passwordEncrypt } from "../../common/utils/encryption";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends BaseCommandHandler<CreateUserCommand> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super();
  }

  async executeCommand(command: CreateUserCommand) {
    const user =
      Object.assign(
        { ...command, createDate: new Date() },
        { password: passwordEncrypt(command.password) }
      );

    const existingUser = await this.userRepository.createQueryBuilder()
      .where('username = :username OR email = :email')
      .setParameters({ username: user.username, email: user.email })
      .execute();

    if (existingUser && existingUser.length) {
      throw new BadRequestException('Username or e-mail is already in use.');
    }

    const insertResult = await this.userRepository.insert({ ...user });

    return Object.assign({ id: insertResult.identifiers[0].id }, user);
  }
}