import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
  OnModuleInit,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
import { ValidateUserHandler } from './commands/validate-user.handler';
import { ModuleRef } from '@nestjs/core';
import { CreateTokenHandler } from './commands/create-token.handler';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

export const CommandHandlers = [CreateTokenHandler, ValidateUserHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    CQRSModule
  ],
  controllers: [AuthController],
  components: [
    AuthService,
    JwtStrategy,
    ...CommandHandlers,
  ],
  exports: [
    AuthService,
    JwtStrategy
  ],
})
export class AuthModule implements NestModule, OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
  ) { }

  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/auth/authorized', method: RequestMethod.ALL });
  }

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.command$.register(CommandHandlers);
  }
}