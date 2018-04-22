import { CommandBus, ICommand } from "@nestjs/cqrs";
import { CommandResult, CommandFailureResult, CommandResultType } from "../commands";
import { HttpException } from "@nestjs/core";
import { request } from "https";
import { HttpStatus } from "@nestjs/common";

export class BaseService {
  constructor(private readonly commandBus: CommandBus) { }

  protected async executeCommand<T>(command: ICommand) {
    const result: CommandResult<any> = await this.commandBus.execute(command);
    if (result.type === CommandResultType.error) {
      const error = (result as CommandFailureResult<Error>).data;
      if (error instanceof HttpException)
        throw error;

      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return result.data;
  }
}