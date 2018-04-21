import { ICommand } from "@nestjs/cqrs";
import { ClientUserInformation } from "../interfaces/client-user-information";

export class ValidateUserCommand implements ICommand {
  constructor(public readonly id: number) { }
}
