import { ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

export class RouteNotFoundException extends HttpException {
  static readonly code = 'ROUTE_NOT_FOUND';
  static readonly message = 'The requested route was not found';
  static readonly statusCode = HttpStatus.NOT_FOUND;

  @ApiProperty({ type: String, example: RouteNotFoundException.code })
  readonly code: string = RouteNotFoundException.code;

  @ApiProperty({ type: String, example: RouteNotFoundException.message })
  readonly message: any = RouteNotFoundException.message;

  @ApiProperty({ type: String, example: 'GET' })
  readonly method: string;

  @ApiProperty({ type: String, example: '/route' })
  readonly route: string;

  @ApiProperty({ type: Number, example: RouteNotFoundException.statusCode })
  readonly statusCode: number = RouteNotFoundException.statusCode;

  constructor(method: string, route: string) {
    super(
      { statusCode: RouteNotFoundException.statusCode, message: RouteNotFoundException.message, method, route, code: RouteNotFoundException.code },
      RouteNotFoundException.statusCode,
    );
    this.method = method;
    this.route = route;
  }
}
