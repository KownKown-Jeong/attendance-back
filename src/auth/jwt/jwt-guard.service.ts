// src/auth/jwt/jwt-guard.service.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return false;
    }
    try {
      const payload = await this.jwtService.verifyToken(token);
      request.user = payload;
      return true;
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

/*
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['jwt'];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      await this.authService.verifyToken(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
*/