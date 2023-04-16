import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../database/Post.entity';
import { CommentEntity } from '../database/Comment.entity';
import { LikeEntity } from '../database/Like.entity';
import { UserEntity } from '../database/User.entity';
import { AuthGuard } from '../strategy/login.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
      CommentEntity,
      LikeEntity,
      UserEntity,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, AuthGuard, JwtService],
})
export class PostModule {}
