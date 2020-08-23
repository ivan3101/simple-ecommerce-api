import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { LoginError } from './errors/login.error';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { UnauthorizedException } from '../utils/exceptions/exceptions';
import { UsersService } from '../user/users.service';
import { User } from '../user/user.entity';
import { CreateUserRequestDto } from '../user/dto/create-user-request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = data;

    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new LoginError();

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) throw new LoginError();

    const payload = { id: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload);

    delete user.password;
    delete user.passwordSalt;

    return { user, token };
  }

  async validateToken(token: string): Promise<User> {
    try {
      const { id, email }: JwtPayloadInterface = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.getUserByEmail(email);

      if (user.id !== Number.parseInt(id, 10)) throw new Error();

      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async register(userData: CreateUserRequestDto): Promise<LoginResponseDto> {
    const user = await this.usersService.createUser(userData);

    const token = await this.jwtService.signAsync({ id: user.id, email: user.email });

    delete user.password;
    delete user.passwordSalt;

    return { user, token };
  }
}
