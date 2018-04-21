import { ICommand } from "@nestjs/cqrs";

export class CreateTokenCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly email: string) {}
}