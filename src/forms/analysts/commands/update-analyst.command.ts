import { ICommand } from '@nestjs/cqrs';

export class UpdateAnalystCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly name: string,
    public readonly email: string) {}
}