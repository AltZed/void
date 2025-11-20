import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Authorization()
  @Get()
  @HttpCode(HttpStatus.OK)
  async profile(@Authorized('id') id: string) {
    return await this.profileService.profile(id);
  }
}
