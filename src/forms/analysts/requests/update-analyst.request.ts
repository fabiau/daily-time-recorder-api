import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class UpdateAnalystRequest {
  @IsNotEmpty()
  @IsNumber()
  @ApiModelProperty()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;
}