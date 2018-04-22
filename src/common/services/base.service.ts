import { CommandBus, ICommand } from "@nestjs/cqrs";
import { CommandResult, CommandFailureResult, CommandResultType, CommandCaughtErrorResult, CommandUncaughtErrorResult } from "../commands";
import { HttpException } from "@nestjs/core";
import { request } from "https";
import { HttpStatus } from "@nestjs/common";

export class BaseService {
  constructor(private readonly commandBus: CommandBus) { }

  protected async executeCommand<T>(command: ICommand) {
    const result: CommandResult<any> = await this.commandBus.execute(command);
    if (result.type === CommandResultType.error) {
      if (result instanceof CommandCaughtErrorResult)
        throw (result as CommandCaughtErrorResult).data;

      throw new HttpException(
        (result as CommandUncaughtErrorResult).data,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return result.data;
  }
}