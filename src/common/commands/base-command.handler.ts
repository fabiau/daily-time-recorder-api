import { ICommand, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult } from "./command-result";
import { CommandFailureResult } from "./command-failure-result";
import { CommandFullfiledResult } from "./command-fulfilled-result";

export abstract class BaseCommandHandler<T extends ICommand> implements ICommandHandler<T> {
  async execute(command: T, resolve: (value?: any) => void) {
    try {
      resolve(new CommandFullfiledResult(
        await this.executeCommand(command)
      ));
    } catch (error) {
      resolve(new CommandFailureResult(error))
    }
  }
  async abstract executeCommand(command: T) : Promise<any>;
}