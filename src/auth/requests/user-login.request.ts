import { IsString, IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class UserLoginRequest {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly password: string;
}