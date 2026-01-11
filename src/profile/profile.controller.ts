import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { ProfileResponse } from './dto/profile-response.dto';
import { UpdateProfile } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Данные профиля',
    description: 'Возращает данные пользователя, беря ID пользователя из JWT',
  })
  @ApiOkResponse({ description: 'Данные пользователя', type: ProfileResponse })
  @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @Authorization()
  @Get()
  @HttpCode(HttpStatus.OK)
  async profile(@Authorized('id') id: string) {
    return await this.profileService.profile(id);
  }

  @ApiOperation({
    summary: 'Обновление данных',
    description: 'Обновления данных пользователя',
  })
  @ApiOkResponse({ description: 'Данные обновлены' })
  @ApiBadRequestResponse({ description: 'Плохой запрос' })
  @ApiConflictResponse({
    description: 'Данный username занят другим пользователем',
  })
  @ApiUnauthorizedResponse({ description: 'Не авторизован' })
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
