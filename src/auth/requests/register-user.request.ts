import { IsString, IsEmail, MinLength, MaxLength } from "class-validator";

export class RegisterUserRequest {
  @IsString()
  @MinLength(3, {
    message: "O nome do usuário deve conter no mínimo 3 caracteres"
  })
  @MaxLength(20, {
    message: "O nome do usuário deve conter no máximo 20 caracteres"
  })
  readonly username: string;

  @IsString()
  @MinLength(6, {
    message: "A senha do usuário deve conter no mínimo 6 caracteres"
  })
  @MaxLength(50, {
    message: "A senha do usuário deve conter no máximo 50 caracteres"
  })
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(2, {
    message: "O nome do usuário deve conter no mínimo 2 caracteres"
  })
  @MaxLength(50, {
    message: "O nome do usuário deve conter no máximo 50 caracteres"
  })
  readonly firstName: string;

  @IsString()
  @MinLength(2, {
    message: "O sobrenome do usuário deve conter no mínimo 2 caracteres"
  })
  @MaxLength(100, {
    message: "O sobrenome do usuário deve conter no máximo 100 caracteres"
  })
  readonly lastName: string;
}