<<<<<<< HEAD
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import type { Request, Response } from 'express';
import { UsersEntity } from 'src/users/entities/users.entity';
import generateUsername from 'src/utils/generate-username.util';
import { parseTimeToMs } from 'src/utils/parser-time.util';
import { Repository } from 'typeorm';
import { LoginRequest } from './dto/login.dto';
import { RegisterRequest } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );

    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
  }

  async register(res: Response, dto: RegisterRequest) {
    const { name, email, password } = dto;

    // default URL avatar
    const avatar =
      'https://so-ta.ru/profile/avatars/DarkusFoxis_68538d0c98239.webp';

    // Checking email
    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    // Generate username
    let username: string;
    let existingUserByUsername: UsersEntity | null;

    // A cycle in which a username is generated and,
    // if it exists in the database, it should be
    // regenerated and subsequently verified.
    do {
      // generate
      username = generateUsername();
      existingUserByUsername = await this.usersRepository.findOne({
        where: { username },
      });
    } while (existingUserByUsername);

    // Created
    const createdUser = await this.usersRepository.create({
      name,
      email,
      username,
      avatar,
      password: await argon2.hash(password),
    });
    const user = await this.usersRepository.save(createdUser);

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginRequest) {
    const { email, password } = dto;
    // Find
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }

    // validate password
    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      throw new NotFoundException('Пользователь не найден!');
    }

    return this.auth(res, user.id);
  }

  private generateTokens(id: string) {
    const payload = {
      id,
    };

    // @ts-ignore
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    // @ts-ignore
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      expires,
    });
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + parseTimeToMs(this.JWT_REFRESH_TOKEN_TTL)),
    );

    return { accessToken };
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Недействительный refreshToken!');
    }

    const payload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.usersRepository.findOne({
        where: {
          id: payload.id,
        },
      });
      if (!user) {
        throw new NotFoundException('Пользователь не найен!');
      }
      return this.auth(res, user.id);
    }
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
    return true;
  }

  async validate(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return user;
  }
}
=======
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import type { Request, Response } from 'express';
import { UsersEntity } from 'src/users/entities/users.entity';
import generateUsername from 'src/utils/generate-username.util';
import { parseTimeToMs } from 'src/utils/parser-time.util';
import { Repository } from 'typeorm';
import { LoginRequest } from './dto/login.dto';
import { RegisterRequest } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );

    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
  }

  async register(res: Response, dto: RegisterRequest) {
    const { name, email, password } = dto;

    // default URL avatar
    const avatar =
      'https://so-ta.ru/profile/avatars/DarkusFoxis_68538d0c98239.webp';

    // Checking email
    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    // Generate username
    let username: string;
    let existingUserByUsername: UsersEntity | null;

    // A cycle in which a username is generated and,
    // if it exists in the database, it should be
    // regenerated and subsequently verified.
    do {
      // generate
      username = generateUsername();
      existingUserByUsername = await this.usersRepository.findOne({
        where: { username },
      });
      console.log(existingUserByUsername);
    } while (existingUserByUsername);

    // Created
    const createdUser = await this.usersRepository.create({
      name,
      email,
      username,
      avatar,
      password: await argon2.hash(password),
    });
    const user = await this.usersRepository.save(createdUser);

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginRequest) {
    const { email, password } = dto;
    // Find
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }

    // validate password
    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      throw new NotFoundException('Пользователь не найден!');
    }

    return this.auth(res, user.id);
  }

  private generateTokens(id: string) {
    const payload = {
      id,
    };

    // @ts-ignore
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    // @ts-ignore
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      expires,
    });
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + parseTimeToMs(this.JWT_REFRESH_TOKEN_TTL)),
    );

    return { accessToken };
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Недействительный refreshToken!');
    }

    const payload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.usersRepository.findOne({
        where: {
          id: payload.id,
        },
      });
      if (!user) {
        throw new NotFoundException('Пользователь не найен!');
      }
      return this.auth(res, user.id);
    }
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
    return true;
  }

  async validate(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return user;
  }
}
>>>>>>> 0a8a238 (Init)
