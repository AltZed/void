import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async profile(id: string) {
    return await this.userRepository.findOne({
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
  }
}
