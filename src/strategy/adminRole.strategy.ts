import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Bỏ qua kiểm tra vai trò nếu không có thông tin roles trong metadata
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Lấy thông tin người dùng từ request

    // Kiểm tra vai trò của người dùng
    return roles.includes('admin') && user?.role === 'admin';
  }
}
