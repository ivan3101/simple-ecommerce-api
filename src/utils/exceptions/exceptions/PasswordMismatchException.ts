import { ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordMismatchException extends HttpException {
  static readonly code = 'PASSWORD_MISMATCH';
  static readonly message = "The sent password does not match the user's password";
  static readonly statusCode = HttpStatus.UNAUTHORIZED;

  @ApiProperty({ type: String, example: PasswordMismatchException.code })
  readonly code: string = PasswordMismatchException.code;

  @ApiProperty({ type: String, example: PasswordMismatchException.message })
  readonly message: any = PasswordMismatchException.message;

  @ApiProperty({ type: Number, example: PasswordMismatchException.statusCode })
  readonly statusCode: number = PasswordMismatchException.statusCode;

  constructor(message?: string) {
    super(
      {
        statusCode: PasswordMismatchException.statusCode,
        message: message || PasswordMismatchException.message,
        code: PasswordMismatchException.code,
      },
      PasswordMismatchException.statusCode,
    );
  }
}
