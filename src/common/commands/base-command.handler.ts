import { ICommand, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, CommandFailureResult, CommandFullfiledResult, CommandUncaughtErrorResult, CommandCaughtErrorResult } from ".";
import { HttpException } from "@nestjs/core";

export abstract class BaseCommandHandler<T extends ICommand> implements ICommandHandler<T> {
  async execute(command: T, resolve: (value?: any) => void) {
    try {
      resolve(new CommandFullfiledResult(
        await this.executeCommand(command)
      ));
    } catch (error) {
      if (parseInt(error.status)) {
        resolve(new CommandCaughtErrorResult(error));
      } else {
        resolve(new CommandUncaughtErrorResult(error))
      }
    }
  }
  async abstract executeCommand(command: T) : Promise<any>;
}