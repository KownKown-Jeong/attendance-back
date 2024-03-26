// src/auth/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // 사용자의 권한 검사 로직 구현
    // 예: user.role === 'admin'
    
    return true; // 또는 false
  }
}