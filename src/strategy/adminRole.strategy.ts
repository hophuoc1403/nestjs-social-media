import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Lấy thông tin người dùng từ request

    console.log(request['user']);

    // Kiểm tra vai trò của người dùng
    return user?.role !== 'admin';
  }
}
