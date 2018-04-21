import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string) {}
}