import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnalystsController } from "./controllers/analysts.controller";
import { Analyst } from './entities/analyst.entity';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
import { AnalystsService } from './services/analysts.service';
import { CreateAnalystHandler } from './commands/create-analyst.handler';
import { ModuleRef } from '@nestjs/core';
import { DeleteAnalystHandler } from './commands/delete-analyst.handler';
import { UpdateAnalystHandler } from './commands/update-analyst.handler';

export const CommandHandlers = [CreateAnalystHandler, DeleteAnalystHandler, UpdateAnalystHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([Analyst]),
    CQRSModule
  ],
  controllers: [AnalystsController],
  components: [
    AnalystsService,
    ...CommandHandlers,
  ],
  exports: [
    AnalystsService
  ]
})
export class AnalystsModule implements NestModule {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
  ) { }

  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/analysts*', method: RequestMethod.ALL });
  }

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.command$.register(CommandHandlers);
  }
}