import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty } from "class-validator";

export class RegisterUserRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: "O nome do usuário deve conter no mínimo 3 caracteres"
  })
  @MaxLength(20, {
    message: "O nome do usuário deve conter no máximo 20 caracteres"
  })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: "A senha do usuário deve conter no mínimo 6 caracteres"
  })
  @MaxLength(50, {
    message: "A senha do usuário deve conter no máximo 50 caracteres"
  })
  readonly password: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: "O nome do usuário deve conter no mínimo 2 caracteres"
  })
  @MaxLength(50, {
    message: "O nome do usuário deve conter no máximo 50 caracteres"
  })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: "O sobrenome do usuário deve conter no mínimo 2 caracteres"
  })
  @MaxLength(100, {
    message: "O sobrenome do usuário deve conter no máximo 100 caracteres"
  })
  readonly lastName: string;
}