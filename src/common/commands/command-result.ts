import { CommandResultType } from "./command-result.type";

export interface CommandResult<T> {
  readonly type: CommandResultType;
  readonly data: T;
}