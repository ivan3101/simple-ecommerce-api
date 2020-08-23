import { IncomingMessage, ServerResponse } from 'http';
import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';

import { UnexpectedErrorException } from '../exceptions/UnexpectedErrorException';

interface IIdentified {
  id: string;
}

interface IRequest extends IncomingMessage, IIdentified {}

interface IResponse extends ServerResponse, IIdentified {}

@Catch()
export class GeneralExceptionFilter extends BaseExceptionFilter {
  protected logger = new Logger(GeneralExceptionFilter.name);

  catch(error: unknown, host: ArgumentsHost) {
    const exception: HttpException = error instanceof HttpException ? error : new UnexpectedErrorException(error);
    this.log(exception, host);
    return super.catch(exception, host);
  }

  log(exception: HttpException, host: ArgumentsHost) {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    const request: IRequest = host.switchToHttp().getRequest();
    const { id, url, method } = request;
    this.logger.error(
      `RESPONSE (${id}) ${method} ${url} ${exception.getStatus()} ---> \n  body: ${JSON.stringify(exception.getResponse(), null, 4)}}`,
    );
  }
}
