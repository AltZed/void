import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UpdateProfile } from './dto/update-profile.dto';
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

  @Authorization()
  @Patch('/update')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Authorized('id') id: string,
    @Body() dto: UpdateProfile,
  ) {
    return await this.profileService.updateProfile(id, dto);
  }
}
