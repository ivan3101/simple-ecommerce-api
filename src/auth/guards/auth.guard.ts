import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { UnauthorizedException } from '../../utils/exceptions/exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { authorization } = request.headers as any;
    const token = AuthGuard.extractTokenFromHeader(authorization);
    (request as any).user = await this.authService.validateToken(token);

    return true;
  }

  private static extractTokenFromHeader(authHeader: string) {
    if (!authHeader) throw new UnauthorizedException();

    const [bearer, token] = authHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException();
    }

    return token;
  }
}
