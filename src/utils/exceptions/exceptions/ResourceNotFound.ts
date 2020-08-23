import { ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  static readonly code = 'RESOURCE_NOT_FOUND';
  static readonly message = 'The requested resource was not found';
  static readonly statusCode = HttpStatus.NOT_FOUND;

  @ApiProperty({ type: String, example: ResourceNotFoundException.code })
  readonly code = ResourceNotFoundException.code;

  @ApiProperty({ type: String, example: ResourceNotFoundException.message })
  readonly message: any = ResourceNotFoundException.message;

  @ApiProperty({ type: String, example: 12 })
  readonly resourceId: number | string;

  @ApiProperty({ type: String, example: 'User' })
  readonly resourceType: string;

  @ApiProperty({ type: Number, example: ResourceNotFoundException.statusCode })
  readonly statusCode: number = ResourceNotFoundException.statusCode;

  constructor(resourceType: string, resourceId: number | string, message?: string) {
    super(
      {
        statusCode: ResourceNotFoundException.statusCode,
        message: message || ResourceNotFoundException.message,
        resourceType,
        resourceId,
        code: ResourceNotFoundException.code,
      },
      ResourceNotFoundException.statusCode,
    );
    this.code = ResourceNotFoundException.code;
    this.statusCode = ResourceNotFoundException.statusCode;
    this.message = ResourceNotFoundException.message;
    this.resourceId = resourceId;
    this.resourceType = resourceType;
  }
}
