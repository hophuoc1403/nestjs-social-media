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
import { ReportPost } from 'src/database/ReportPost.entity';
import { SavedPostEntity } from 'src/database/SavedPost.entity';

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
      ReportPost,
      SavedPostEntity,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, AuthGuard, JwtService],
})
export class PostModule {}
