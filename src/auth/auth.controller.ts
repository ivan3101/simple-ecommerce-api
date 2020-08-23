import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { LoginError } from './errors/login.error';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthService } from './auth.service';
import { UnexpectedErrorException, ValidationException } from '../utils/exceptions/exceptions';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    description: 'Login',
  })
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiUnauthorizedResponse({
    type: LoginError,
  })
  @ApiInternalServerErrorResponse({
    type: UnexpectedErrorException,
  })
  login(@Body() loginDto: LoginRequestDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @HttpCode(200)
  @ApiOperation({
    description: 'Register',
  })
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiInternalServerErrorResponse({
    type: UnexpectedErrorException,
  })
  register(@Body() loginDto: LoginRequestDto) {
    return this.authService.register(loginDto);
  }
}
