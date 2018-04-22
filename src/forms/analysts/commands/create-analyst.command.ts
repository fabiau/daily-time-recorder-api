import { ICommand } from '@nestjs/cqrs';

export class CreateAnalystCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly name: string,
    public readonly email: string) {}
}