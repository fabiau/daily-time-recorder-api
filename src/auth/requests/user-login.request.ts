import { IsString, IsNotEmpty } from "class-validator";

export class UserLoginRequest {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}