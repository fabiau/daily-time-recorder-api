import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateAnalystRequest {
  @IsNotEmpty()
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;
}