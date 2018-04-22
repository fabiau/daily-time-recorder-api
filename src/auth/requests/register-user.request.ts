import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class RegisterUserRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @ApiModelProperty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  @ApiModelProperty()
  readonly password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @ApiModelProperty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @ApiModelProperty()
  readonly lastName: string;
}