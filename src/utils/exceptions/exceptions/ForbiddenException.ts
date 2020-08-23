import { ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  static readonly code = 'FORBIDDEN';
  static readonly message = 'Insufficient permissions';
  static readonly statusCode = HttpStatus.FORBIDDEN;

  @ApiProperty({ type: String, example: ForbiddenException.code })
  readonly code: string = ForbiddenException.code;

  @ApiProperty({ type: String, example: ForbiddenException.message })
  readonly message: string = ForbiddenException.message;

  @ApiProperty({ type: Number, example: ForbiddenException })
  readonly statusCode: number = ForbiddenException.statusCode;

  constructor(message?: string) {
    super(
      {
        statusCode: ForbiddenException.statusCode,
        code: ForbiddenException.code,
        message: message || ForbiddenException.message,
      },
      ForbiddenException.statusCode,
    );

    this.message = message || ForbiddenException.message;
  }
}
