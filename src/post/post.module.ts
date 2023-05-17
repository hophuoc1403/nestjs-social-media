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
import { PostTagEntity } from '../database/PostTag.entity';
import { TagEntity } from '../database/Tag.entity';
import { UserPostEntity } from '../database/UserPost.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
      CommentEntity,
      LikeEntity,
      UserEntity,
      PostTagEntity,
      TagEntity,
      UserPostEntity,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, AuthGuard, JwtService],
})
export class PostModule {}
