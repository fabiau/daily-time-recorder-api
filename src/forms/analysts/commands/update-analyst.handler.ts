import { CommandHandler } from "@nestjs/cqrs";
import { UpdateAnalystCommand } from "./update-analyst.command";
import { BaseCommandHandler } from "../../../common/commands";
import { InjectRepository } from "@nestjs/typeorm";
import { Analyst } from "../entities/analyst.entity";
import { Repository } from "typeorm";
import { User } from "../../../users/entities/user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateAnalystCommand)
export class UpdateAnalystHandler extends BaseCommandHandler<UpdateAnalystCommand> {
  constructor(@InjectRepository(Analyst) private readonly analystRepository: Repository<Analyst>) {
    super();
  }

  async executeCommand(command: UpdateAnalystCommand) {
    const existingAnalyst =
      await this.analystRepository.findOne({ id: command.id, userId: command.userId });

    if (!existingAnalyst)
      throw new NotFoundException('The analyst doesn\'t exist.');

    const anotherAnalystWithSameEmail = await this.analystRepository
      .createQueryBuilder()
      .where('user_id = :userId AND email = :email AND id != :id')
      .setParameters({ userId: command.userId, email: command.email, id: command.id })
      .execute();

    if (anotherAnalystWithSameEmail && anotherAnalystWithSameEmail.length)
      throw new NotFoundException('The e-mail is being already used by another analyst you registered.');

    const insertResult = await this.analystRepository.update(command.id, command);
    return command;
  }
}