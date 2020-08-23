import * as path from 'path';
import { ArgumentsHost, Catch, Logger, NotFoundException } from '@nestjs/common';

import { GeneralExceptionFilter } from './GeneralExceptionFilter';
import { RouteNotFoundException } from '../exceptions/RouteNotFound';

@Catch(NotFoundException)
export class NotFoundExceptionFilter extends GeneralExceptionFilter {
  protected logger = new Logger(NotFoundExceptionFilter.name);

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const message: string = exception.message ?? exception.message;
    const [method, route] = message.split(' ').slice(1);
    return super.catch(new RouteNotFoundException(method.toUpperCase(), path.posix.normalize(route)), host);
  }
}
