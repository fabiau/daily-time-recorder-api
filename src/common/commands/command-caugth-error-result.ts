import { CommandFailureResult, CommandResultType, CommandResult } from ".";
import { HttpException } from "@nestjs/common";

export class CommandCaughtErrorResult extends CommandFailureResult<any> {
  constructor(readonly data: any) { super(data); }
}
