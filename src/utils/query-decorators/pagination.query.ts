import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ValidationError, ValidationException } from '../exceptions/exceptions';

export interface PaginationQueryInteface {
  take: number;
  skip: number;
}

enum PaginationParams {
  TAKE = 'take',
  SKIP = 'skip',
}

const paramsSplitRegex = /\?/;

function validatePaginationParams(take: string, skip: string): PaginationQueryInteface {
  take = take || '20';
  skip = skip || '0';

  const takeNumber = Number.parseInt(take, 10);
  const skipNumber = Number.parseInt(skip, 10);
  const errors: ValidationError[] = [];

  if (take && Number.isNaN(takeNumber)) {
    errors.push({
      path: PaginationParams.TAKE,
      value: take,
      validation: 'take parameter must be a number',
      message: 'The take parameter is not a number. If you want to use this parameter, you must enter a number',
    });
  }

  if (skip && Number.isNaN(skipNumber)) {
    errors.push({
      path: PaginationParams.SKIP,
      value: skip,
      validation: 'skip parameter must be a number',
      message: 'The skip parameter is not a number. If you want to use this parameter, you must enter a number',
    });
  }

  if (errors.length) throw new ValidationException(errors);

  return {
    take: !Number.isNaN(takeNumber) && takeNumber,
    skip: !Number.isNaN(skipNumber) && skipNumber,
  };
}

export const PaginationQuery = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const params = request.url.split(paramsSplitRegex)[1];
  const queries = new URLSearchParams(params);

  return validatePaginationParams(queries.get(PaginationParams.TAKE), queries.get(PaginationParams.SKIP));
});
