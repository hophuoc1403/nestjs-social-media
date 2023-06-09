import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './database/User.entity';
import * as process from 'process';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter, storage } from './config/multer.config';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { PostEntity } from './database/Post.entity';
import { UserPostEntity } from './database/UserPost.entity';
import { SavedPostEntity } from './database/SavedPost.entity';
import { CommentEntity } from './database/Comment.entity';
import { TagEntity } from './database/Tag.entity';
import { LikeEntity } from './database/Like.entity';
import { PostTagEntity } from './database/PostTag.entity';
import { PostModule } from './post/post.module';
import { UserFriendEntity } from './database/UserFriend.entity';
import { ChatModule } from './chat/chat.module';
import { RoomChatEntity } from './database/RoomChat.entity';
import { ChatEntity } from './database/Chat.entity';
import { NotificationEntity } from './database/Notification.entity';
import { NotificationModule } from './notification/notification.module';
import { StoryEntity } from './database/Story.entity';
import { StoryModule } from './story/story.module';
import { ConfigModule } from '@nestjs/config';
import { ReportPost } from './database/ReportPost.entity';
import { AccountsModule } from './accounts/accounts.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/exception.filter';
import { TagsModule } from './tags/tags.module';

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
        UserPostEntity,
        SavedPostEntity,
        CommentEntity,
        LikeEntity,
        TagEntity,
        PostTagEntity,
        UserFriendEntity,
        RoomChatEntity,
        ChatEntity,
        NotificationEntity,
        StoryEntity,
        ReportPost,
      ],
      synchronize: false,
    }),
    MulterModule.register({
      storage,
      fileFilter,
    }),
    UserEntity,
    PostEntity,
    UserPostEntity,
    SavedPostEntity,
    CommentEntity,
    LikeEntity,
    TagEntity,
    PostTagEntity,
    UserFriendEntity,
    RoomChatEntity,
    ChatEntity,
    NotificationEntity,
    StoryEntity,
    ReportPost,
    AuthModule,
    UserModule,
    PostModule,
    ChatModule,
    NotificationModule,
    StoryModule,
    AccountsModule,
    TagsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
  ],
})
export class AppModule {}
