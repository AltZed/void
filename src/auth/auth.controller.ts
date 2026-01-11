import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './dto/login.dto';
import { RegisterRequest, RegisterResponse } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Регистрация пользователя',
    description: 'Возвращает токен в ответе, и refresh-токен в cookies',
  })
  @ApiCreatedResponse({
    description: 'Пользователь создан',
    type: RegisterResponse,
  })
  @ApiBadRequestResponse({ description: 'Плохой запрос' })
  @ApiConflictResponse({
    description: 'Пользователь с таким email уже существует',
  })
  @ApiTooManyRequestsResponse({
    description: 'Слишком много попыток регистрации',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Логин пользователя',
    description: 'Возвращает токен в ответе, и refresh-токен в cookies',
  })
  @ApiOkResponse({
    description: 'Пользователь вошёл',
    type: LoginResponse,
  })
  @ApiBadRequestResponse({ description: 'Плохой запрос' })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiTooManyRequestsResponse({
    description: 'Слишком много попыток входа',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Обновление JWT',
    description: 'Обновляет JWT по refreshToken',
  })
  // мейби костыль в том, что я указал LoginResponse в типе
  // В будущем мейби изменю
  @ApiOkResponse({
    description: 'Возращает новый токен',
    type: LoginResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @ApiTooManyRequestsResponse({ description: 'Слишком много запросов' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Выход из системы',
    description:
      'Удаляет refresh-токен из cookies, делая невозможным дальнейшее обновление JWT',
  })
  @ApiOkResponse({ description: 'Пользователь успешно вышел из системы' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
