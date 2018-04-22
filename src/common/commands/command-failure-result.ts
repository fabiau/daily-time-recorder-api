import { CommandResult } from "./command-result";
import { CommandResultType } from "./command-result.type";

export abstract class CommandFailureResult<T> implements CommandResult<T> {
  readonly type: CommandResultType = CommandResultType.error;
  constructor(readonly data: T) { }
}
