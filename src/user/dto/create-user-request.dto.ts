import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../user.entity';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(User.passwordMinLength)
  @Matches(User.passwordRegex)
  password: string;
}
