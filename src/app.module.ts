import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './database/User.entity';
import { PostEntity } from './database/Post.entity';
import * as process from 'process';
import { CommentEntity } from './database/Comment.entity';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter, storage } from './config/multer.config';
import { LikeEntity } from './database/Like.entity';
import { UserModule } from './user/user.module';
import { UserFriendEntity } from './database/UserFriend.entity';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { TagEntity } from './database/Tag.entity';
import { PostTagEntity } from './database/PostTag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: +process.env.DB_PORT,
      username: 'root',
      password: '',
      database: 'social-media',
      entities: [
        TagEntity,
        PostTagEntity,
        UserEntity,
        PostEntity,
        CommentEntity,
        LikeEntity,
        UserFriendEntity,
      ],
      // synchronize: true,
    }),
    UserEntity,
    PostEntity,
    CommentEntity,
    AuthModule,
    LikeEntity,
    UserFriendEntity,
    TagEntity,
    PostTagEntity,
    MulterModule.register({
      storage,
      fileFilter,
    }),
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
