import { ArgumentsHost, Catch, Logger, UnauthorizedException as NestUnauthorizedException } from '@nestjs/common';

import { GeneralExceptionFilter } from './GeneralExceptionFilter';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

@Catch(NestUnauthorizedException)
export class UnauthorizedExceptionFilter extends GeneralExceptionFilter {
  protected logger = new Logger(UnauthorizedExceptionFilter.name);

  catch(exception: NestUnauthorizedException, host: ArgumentsHost) {
    return super.catch(new UnauthorizedException(), host);
  }
}
