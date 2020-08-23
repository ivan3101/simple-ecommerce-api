import { ApiProperty } from '@nestjs/swagger';

export class ValidationError {
  @ApiProperty({ type: String, example: 'The given string is not lowercase' })
  message: string;

  @ApiProperty({ type: String, example: 'User' })
  model?: string;

  @ApiProperty({ type: String, example: 'email' })
  path: string;

  @ApiProperty({ type: String, example: 'EmailMustBeLowerCase' })
  validation: string;

  @ApiProperty({ type: String, example: 'EmailNotLowerCase@gmail.com' })
  value: any;

  constructor(args: ValidationError) {
    this.message = args.message;
    this.path = args.path;
    this.validation = args.validation;
    this.value = args.value;
    this.model = args.model;
  }
}
