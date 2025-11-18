import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async getMe(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'avatar', 'email', 'createdAt', 'name', 'username'],
    });
  }
}
