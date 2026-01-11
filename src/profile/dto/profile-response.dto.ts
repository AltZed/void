import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ProfileResponse {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Darkus Foxis',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'Ссылка на аватар пользователя',
    example: 'https://so-ta.ru/profile/avatars/DarkusFoxis_68538d0c98239.webp',
  })
  @IsString()
  @IsNotEmpty()
  avatar: string;
  @ApiProperty({
    description: 'Юзернейм пользователя',
    example: '@nu46y37b0yPbhw',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    description: 'Email пользователя',
    example: 'darkus@mail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Дата создания профиля',
    example: '2026-01-11T04:41:43.601Z',
  })
  @IsString()
  @IsNotEmpty()
  createdAt: string;
  @ApiProperty({
    description: 'Дата обновления профиля',
    example: '2026-01-11T04:41:43.601Z',
  })
  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}
