import { CommandFailureResult, CommandResultType, CommandResult } from ".";

export class CommandUncaughtErrorResult extends CommandFailureResult<Error> {
  constructor(readonly data: Error) { super(data); }
}
