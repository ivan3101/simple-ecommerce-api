import { ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnexpectedErrorException extends HttpException {
  static readonly code = 'INTERNAL_SERVER_ERROR';
  static readonly message = 'Some unexpected error has ocurred';
  static readonly statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  @ApiProperty({ type: String, example: UnexpectedErrorException.code })
  readonly code: string = UnexpectedErrorException.code;

  @ApiProperty({ type: Object, example: { detail: 'The error object can be any type of object' } })
  readonly error: object;

  @ApiProperty({ type: String, example: UnexpectedErrorException.message })
  readonly message: any = UnexpectedErrorException.message;

  @ApiProperty({ type: Number, example: UnexpectedErrorException.statusCode })
  readonly statusCode: number = UnexpectedErrorException.statusCode;

  constructor(error, message?: string) {
    super(
      {
        statusCode: error.statusCode || error.status || UnexpectedErrorException.statusCode,
        message: message || error.message || UnexpectedErrorException.message,
        code: error.code || UnexpectedErrorException.code,
        error: Object.assign({ name: error.name, stack: error.stack, message: error.message }, error),
      },
      UnexpectedErrorException.statusCode,
    );
    this.statusCode = error.statusCode || error.status || UnexpectedErrorException.statusCode;
    this.message = error.message || UnexpectedErrorException.message;
    this.code = error.code || UnexpectedErrorException.code;
    this.error = Object.assign({ name: error.name, stack: error.stack, message: error.message }, error);
  }
}
