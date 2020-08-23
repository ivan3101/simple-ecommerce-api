import { ApiResponseProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginError extends HttpException {
  static readonly code = 'LOGIN_ERROR';
  static readonly message = 'Invalid email or password';
  static readonly statusCode = HttpStatus.UNAUTHORIZED;

  @ApiResponseProperty({ example: LoginError.code })
  code = LoginError.code;

  @ApiResponseProperty({ example: LoginError.message })
  message = LoginError.message;

  @ApiResponseProperty({ example: LoginError.statusCode })
  statusCode = LoginError.statusCode;

  constructor() {
    super(
      {
        code: LoginError.code,
        message: LoginError.message,
        statusCode: LoginError.statusCode,
      },
      LoginError.statusCode,
    );
  }
}
