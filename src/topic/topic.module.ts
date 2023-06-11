import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './services/topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/User.entity';
import { AuthGuard } from '../strategy/login.strategy';
import { JwtService } from '@nestjs/jwt';
import { UserFriendEntity } from '../database/UserFriend.entity';
import { TopicEntity } from '../database/Topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity, UserFriendEntity])],
  controllers: [TopicController],
  providers: [TopicService, JwtService, AuthGuard],
})
export class TopicModule {}
