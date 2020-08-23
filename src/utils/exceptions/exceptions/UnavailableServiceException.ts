import { ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnavailableServiceException extends HttpException {
  static readonly code = 'SERVICE_UNAVAILABLE';
  static readonly message = 'The requested service is not available';
  static readonly statusCode = HttpStatus.SERVICE_UNAVAILABLE;

  @ApiProperty({ type: String, example: UnavailableServiceException.code })
  readonly code: string = UnavailableServiceException.code;

  @ApiProperty({ type: String, example: 'http://service.com' })
  readonly host: string;

  @ApiProperty({ type: String, example: UnavailableServiceException.message })
  readonly message: any = UnavailableServiceException.message;

  @ApiProperty({ type: String, example: 'AuthService' })
  readonly name: string;

  @ApiProperty({ type: Number, example: UnavailableServiceException.statusCode })
  readonly statusCode: number = UnavailableServiceException.statusCode;

  constructor(host: string, name?: string) {
    super(
      {
        statusCode: UnavailableServiceException.statusCode,
        message: UnavailableServiceException.message,
        host,
        name,
        code: UnavailableServiceException.code,
      },
      UnavailableServiceException.statusCode,
    );
    this.host = host;
    this.name = name;
  }
}
