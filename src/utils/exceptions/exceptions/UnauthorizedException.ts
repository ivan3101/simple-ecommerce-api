import { ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  static readonly code = 'UNAUTHORIZED';
  static readonly statusCode = HttpStatus.UNAUTHORIZED;

  @ApiProperty({ type: String, example: UnauthorizedException.code })
  readonly code: string = UnauthorizedException.code;

  @ApiProperty({ type: Number, example: UnauthorizedException.statusCode })
  readonly statusCode: number = UnauthorizedException.statusCode;

  constructor() {
    super(
      {
        statusCode: UnauthorizedException.statusCode,
        code: UnauthorizedException.code,
      },
      UnauthorizedException.statusCode,
    );
  }
}
