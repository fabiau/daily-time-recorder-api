import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserRequest } from "../requests/create-user.request";
import { CreateUserCommand } from "../commands/create-user.command";

@Component()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commandBus: CommandBus
  ) {}

  async create(request: CreateUserRequest) {
    const { username, password, email, firstName, lastName } = request;
    return await this.commandBus.execute(
      new CreateUserCommand(username, password, email, firstName, lastName)
    );
  }
}
