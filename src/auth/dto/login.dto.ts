import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  password: string;
}
