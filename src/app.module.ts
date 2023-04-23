import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './database/User.entity';
import * as process from 'process';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter, storage } from './config/multer.config';
// import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { PostEntity } from './database/Post.entity';
import { PostShareEntity } from './database/PostShare.entity';
import { SavedPostEntity } from './database/SavedPost.entity';
import { CommentEntity } from './database/Comment.entity';
import { LikeEntity } from './database/Like.entity';
import { TagEntity } from './database/Tag.entity';
import { PostTagEntity } from './database/PostTag.entity';
import { PostModule } from './post/post.module';
import { UserFriendEntity } from './database/UserFriend.entity';
// import { PostModule } from './post/post.module';

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
        UserEntity,
        PostEntity,
        PostShareEntity,
        SavedPostEntity,
        CommentEntity,
        LikeEntity,
        TagEntity,
        PostTagEntity,
        UserFriendEntity,
      ],
      synchronize: true,
    }),
    UserEntity,
    PostEntity,
    PostShareEntity,
    SavedPostEntity,
    CommentEntity,
    LikeEntity,
    TagEntity,
    PostTagEntity,
    AuthModule,
    UserFriendEntity,
    MulterModule.register({
      storage,
      fileFilter,
    }),
    // UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
