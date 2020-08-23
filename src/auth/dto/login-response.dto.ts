import { ApiResponseProperty } from '@nestjs/swagger';

import { User } from '../../user/user.entity';

export class LoginResponseDto {
  @ApiResponseProperty()
  user: User;

  @ApiResponseProperty()
  token: string;
}
