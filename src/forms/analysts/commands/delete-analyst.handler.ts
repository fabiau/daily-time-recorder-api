import { CommandHandler } from "@nestjs/cqrs";
import { BaseCommandHandler } from "../../../common/commands";
import { InjectRepository } from "@nestjs/typeorm";
import { Analyst } from "../entities/analyst.entity";
import { Repository } from "typeorm";
import { User } from "../../../users/entities/user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { DeleteAnalystCommand } from "./delete-analyst.command";

@CommandHandler(DeleteAnalystCommand)
export class DeleteAnalystHandler extends BaseCommandHandler<DeleteAnalystCommand> {
  constructor(@InjectRepository(Analyst) private readonly analystRepository: Repository<Analyst>) {
    super();
  }

  async executeCommand(command: DeleteAnalystCommand) {
    const existingAnalyst =
      await this.analystRepository.findOne({ ...command });
    if (!existingAnalyst)
      throw new NotFoundException('The analyst doesn\'t exist.');

    await this.analystRepository.delete(existingAnalyst);
    return existingAnalyst;
  }
}