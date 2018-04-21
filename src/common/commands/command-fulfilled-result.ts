import { CommandResult } from "./command-result";
import { CommandResultType } from "./command-result.type";

export class CommandFullfiledResult<T> implements CommandResult<T> {
  readonly type: CommandResultType = CommandResultType.success;
  constructor(readonly data: T) { }
}
