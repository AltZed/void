import { Controller, Get } from '@nestjs/common';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ME
  @Authorization()
  @Get('me')
  async getMe(@Authorized('id') id: string) {
    return this.usersService.getMe(id);
  }
}
