import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(64)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  password: string;
}
