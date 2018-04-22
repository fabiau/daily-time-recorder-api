import { ICommand } from "@nestjs/cqrs";
import { User } from "../../users/entities/user.entity";

export class CreateTokenCommand implements ICommand {
  constructor(
    public readonly user: User) {}
}