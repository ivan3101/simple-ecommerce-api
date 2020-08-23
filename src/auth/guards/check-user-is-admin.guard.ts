import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ForbiddenException } from '../../utils/exceptions/exceptions';

@Injectable()
export class CheckUserIsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const { user } = request;

    if (!user || !user.isAdmin) {
      throw new ForbiddenException('User must be an Admin to perform this action');
    }

    return true;
  }
}
