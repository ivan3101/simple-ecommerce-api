import { ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

import { ValidationError } from './ValidationError';

type ValidationType = 'MODEL' | 'ROUTE';
const VALIDATION_TYPES: ValidationType[] = ['MODEL', 'ROUTE'];
export class ValidationException extends HttpException {
  static readonly code = 'VALIDATION_ERROR';
  static readonly message = 'A logic validation has not been fullfilled';
  static MODEL: ValidationType = 'MODEL';
  static ROUTE: ValidationType = 'ROUTE';
  static readonly statusCode = HttpStatus.UNPROCESSABLE_ENTITY;

  @ApiProperty({ type: String, example: ValidationException.code })
  readonly code: string = ValidationException.code;

  @ApiProperty({ type: String, example: ValidationException.message })
  readonly message: any = ValidationException.message;

  @ApiProperty({ type: ValidationError, isArray: true })
  readonly reasons: ValidationError[];

  @ApiProperty({ type: Number, example: ValidationException.statusCode })
  readonly statusCode: number = ValidationException.statusCode;

  @ApiProperty({ type: String, example: 'MODEL', enum: VALIDATION_TYPES })
  readonly validationType: ValidationType;

  constructor(reasons: ValidationError[], validationType: ValidationType = 'MODEL') {
    super(
      {
        statusCode: ValidationException.statusCode,
        validationType,
        message: ValidationException.message,
        reasons,
        code: ValidationException.code,
      },
      ValidationException.statusCode,
    );
    this.validationType = validationType;
    this.reasons = reasons;
  }
}
