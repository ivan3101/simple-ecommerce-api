import { ArgumentMetadata, Injectable, Optional, PipeTransform } from '@nestjs/common';

import { ValidationException } from '../exceptions/exceptions';

interface ParseIntPipeOptions {
  required?: boolean;
}

@Injectable()
export class ParseIntPipe implements PipeTransform {
  private readonly required: boolean;

  constructor(@Optional() options: ParseIntPipeOptions) {
    options = options || {};

    const { required = false } = options;

    this.required = required;
  }

  transform(value: string, metadata: ArgumentMetadata): any {
    const exists = !!value;
    const { data: property } = metadata;

    if (!exists && !this.required) return;

    if (!exists && this.required) {
      throw new ValidationException([
        {
          path: property,
          value: null,
          validation: `${property} should not be empty`,
          message: `${property} parameter must have a value if you want to use this route`,
        },
      ]);
    }

    const isNumber = !Number.isNaN(parseInt(value, 10));

    if (!isNumber) {
      throw new ValidationException([
        {
          path: property,
          value,
          validation: `${property} should be a number`,
          message: `${property} parameter must be a valid number`,
        },
      ]);
    }

    return parseInt(value, 10);
  }
}
