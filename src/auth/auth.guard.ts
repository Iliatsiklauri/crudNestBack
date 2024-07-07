import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = getToken(request);
    if (!token) throw new UnauthorizedException('not authorized');
    try {
      const user = await this.JwtService.verifyAsync(token);
      request.user = {
        email: user.email,
        id: user.id,
      };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

function getToken(req) {
  if (!req.headers['cookie']) return null;
  const token = req.headers['cookie'].split('=')[1];
  return token;
}
