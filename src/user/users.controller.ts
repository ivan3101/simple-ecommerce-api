import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UnauthorizedException, UnexpectedErrorException, ValidationException } from '../utils/exceptions/exceptions';
import { CheckUserIsAdminGuard } from '../auth/guards/check-user-is-admin.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, CheckUserIsAdminGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Create a new User. Only admins can make this request.',
  })
  @ApiCreatedResponse({ type: User })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiInternalServerErrorResponse({ type: UnexpectedErrorException })
  create(@Body() body: CreateUserRequestDto) {
    return this.usersService.createUser(body);
  }
}
