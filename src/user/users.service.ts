import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserRequestDto } from './dto/create-user-request.dto';

@Injectable()
export class UsersService {
  private readonly defaultEmail = 'test@test.com';
  private readonly defaultPassword = '1234567mM!';

  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  createUser(userData: CreateUserRequestDto) {
    return this.user.save(userData);
  }

  getUserByEmail(email: string) {
    return this.user.findOne({ email });
  }

  async createDefaultAdminUser() {
    const defaultUserExists = await this.checkIfDefaultUserExists();

    if (!defaultUserExists) {
      await this.user.insert({
        email: this.defaultEmail,
        password: this.defaultPassword,
        isAdmin: true,
      });
    }
  }

  private async checkIfDefaultUserExists() {
    try {
      await this.user.findOneOrFail(
        {
          email: this.defaultEmail,
        },
        {
          select: ['id'],
        },
      );
      return true;
    } catch {
      return false;
    }
  }
}
