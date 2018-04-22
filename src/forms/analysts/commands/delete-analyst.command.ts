import { ICommand } from '@nestjs/cqrs';

export class DeleteAnalystCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly id: number) {}
}