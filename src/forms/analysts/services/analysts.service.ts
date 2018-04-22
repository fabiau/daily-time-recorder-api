import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Analyst } from "../entities/analyst.entity";
import { Repository } from "typeorm";
import { BaseService } from "../../../common/services/base.service";
import { CommandBus } from "@nestjs/cqrs";
import { CreateAnalystRequest } from "../requests/create-analyst.request";
import { User } from "../../../users/entities/user.entity";
import { CreateAnalystCommand } from "../commands/create-analyst.command";

@Component()
export class AnalystsService extends BaseService {
  constructor(
    @InjectRepository(Analyst)
    private readonly anlystRepository: Repository<Analyst>,
    commandBus: CommandBus
  ) {
    super(commandBus);
  }

  async create(loggedUser: User, request: CreateAnalystRequest) {
    const { name, email } = request;
    return await this.executeCommand(
      new CreateAnalystCommand(loggedUser.id, name, email)
    );
  }
}
