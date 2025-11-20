import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateProfile } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async profile(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        name: true,
        username: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        email: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async updateProfile(id: string, dto: UpdateProfile) {
    const { username } = dto;

    // Проверка на наличее пользователя
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    // Проверяем не занят ли usernmae
    if (username && user.username !== username) {
      const findByUsername = await this.userRepository.findOneBy({ username });
      if (findByUsername) {
        throw new ConflictException(
          'Данный username занят другим пользователем',
        );
      }
    }

    // Обновляем данные
    Object.assign(user, dto);
    await this.userRepository.save(user);
    return true;
  }
}
