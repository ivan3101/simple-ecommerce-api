import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { InjectConnection } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { User } from './user.entity';

@Injectable()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  private readonly saltRounds = 10;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.connection.subscribers.push(this);
  }

  beforeInsert(event: InsertEvent<User>): Promise<void> {
    return this.encryptPassword(event.entity);
  }

  async encryptPassword(user: User) {
    const salt = await genSalt(this.saltRounds);

    user.password = await hash(user.password, salt);
    user.passwordSalt = salt;
  }

  listenTo() {
    return User;
  }
}
