import { CommandHandler } from "@nestjs/cqrs";
import { CreateAnalystCommand } from "./create-analyst.command";
import { BaseCommandHandler } from "../../../common/commands";
import { InjectRepository } from "@nestjs/typeorm";
import { Analyst } from "../entities/analyst.entity";
import { Repository } from "typeorm";
import { User } from "../../../users/entities/user.entity";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateAnalystCommand)
export class CreateAnalystHandler extends BaseCommandHandler<CreateAnalystCommand> {
  constructor(@InjectRepository(Analyst) private readonly analystRepository: Repository<Analyst>) {
    super();
  }

  async executeCommand(command: CreateAnalystCommand) {
    const analyst = {
      name: command.name,
      email: command.email,
      userId: +command.userId
    };
    const existingAnalyst =
      await this.analystRepository.findOne({ email: analyst.email, userId: analyst.userId });
    if (existingAnalyst)
      throw new BadRequestException('The e-mail is being already used by another analyst you registered.');

    const insertResult = await this.analystRepository.insert(analyst);
    return Object.assign({ id: insertResult.identifiers[0].id }, analyst);
  }
}