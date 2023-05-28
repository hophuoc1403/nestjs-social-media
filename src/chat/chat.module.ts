import { Module } from '@nestjs/common';
import { ChatGateWay } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomChatEntity } from '../database/RoomChat.entity';
import { ChatEntity } from '../database/Chat.entity';
import { UserEntity } from '../database/User.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatGateWay, ChatService],
  imports: [TypeOrmModule.forFeature([RoomChatEntity, ChatEntity, UserEntity])],
  controllers: [ChatController],
})
export class ChatModule {}
