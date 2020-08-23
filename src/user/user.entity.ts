import { Column, Entity } from 'typeorm/index';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer/decorators';
import { ApiResponseProperty } from '@nestjs/swagger';

import { BaseEntity } from '../utils/base-entity.abstract';

@Entity()
export class User extends BaseEntity {
  static passwordMinLength = 8;
  static passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#$%^&*()\-_=+[{}\]\\|;:'",<.>/?€£¥₹])/;

  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @IsString()
  @Exclude({ toPlainOnly: true })
  @Column()
  passwordSalt: string;

  @ApiResponseProperty()
  @IsBoolean()
  @Column({ default: false })
  isAdmin: boolean;
}
