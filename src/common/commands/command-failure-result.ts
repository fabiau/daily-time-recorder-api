import { CommandResult } from "./command-result";
import { CommandResultType } from "./command-result.type";

export class CommandFailureResult<T extends Error> implements CommandResult<T> {
  readonly type: CommandResultType = CommandResultType.error;
  constructor(readonly data: T) { }
}
