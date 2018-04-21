import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { CreateUserHandler } from './commands/create-user.handler';
import { ModuleRef } from '@nestjs/core';
import { CommandBus, CQRSModule } from '@nestjs/cqrs';

export const CommandHandlers = [CreateUserHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CQRSModule
  ],
  components: [
    UsersService,
    ...CommandHandlers,
  ],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
  ) { }

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.command$.register(CommandHandlers);
  }
}