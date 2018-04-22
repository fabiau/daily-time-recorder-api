import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from './forms/forms.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    FormsModule,
    TypeOrmModule.forRoot(),
],
  controllers: [AppController],
})
export class AppModule {
  
}
