import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/User.entity';
import { AuthGuard } from '../strategy/login.strategy';
import { JwtService } from '@nestjs/jwt';
import { UserFriendEntity } from '../database/UserFriend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserFriendEntity])],
  controllers: [UserController],
  providers: [UserService, JwtService, AuthGuard],
})
export class UserModule {}
