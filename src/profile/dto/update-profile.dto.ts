import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProfile {
  @ApiProperty({
    description: 'Новое имя пользователя',
    example: 'DARKUS new Name',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(64)
  name: string;

  @ApiProperty({
    description: 'Новая ссылка аватарки',
    example: 'https://so-ta.ru/profile/avatars/DarkusFoxis_68538d0c98239.webp',
  })
  @IsOptional()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({
    description: 'Новый юзернейм',
    example: '@DarkusFoxis',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(64)
  username: string;
}
