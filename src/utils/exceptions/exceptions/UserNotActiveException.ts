import { ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotActiveException extends HttpException {
  static readonly code = 'USER_NOT_ACTIVE';
  static readonly message = 'This user is not active';
  static readonly statusCode = HttpStatus.CONFLICT;

  @ApiProperty({ type: String, example: UserNotActiveException.code })
  readonly code: string = UserNotActiveException.code;

  @ApiProperty({ type: Object, example: { detail: 'The error object can be any type of object' } })
  readonly error: object;

  @ApiProperty({ type: String, example: UserNotActiveException.message })
  readonly message: any = UserNotActiveException.message;

  @ApiProperty({ type: Number, example: UserNotActiveException.statusCode })
  readonly statusCode: number = UserNotActiveException.statusCode;

  constructor(error: any = {}) {
    super(
      {
        statusCode: error.statusCode || error.status || UserNotActiveException.statusCode,
        message: error.message || UserNotActiveException.message,
        code: error.code || UserNotActiveException.code,
        error: Object.assign({ name: error.name, stack: error.stack, message: error.message }, error),
      },
      UserNotActiveException.statusCode,
    );
    this.statusCode = error.statusCode || error.status || UserNotActiveException.statusCode;
    this.message = error.message || UserNotActiveException.message;
    this.code = error.code || UserNotActiveException.code;
  }
}
