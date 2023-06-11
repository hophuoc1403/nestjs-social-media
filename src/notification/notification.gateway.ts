import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../database/Notification.entity';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class NotificationGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {});
  }

  @SubscribeMessage('sendNotification')
  async onGetNotification(
    socket,
    data: {
      senderName: string;
      receiverName: string;
      type: string;
      senderId: number;
      receiverId: number;
      postId: number;
    },
  ) {
    const { senderId, senderName, receiverName, receiverId, type, postId } =
      data;
    socket.emit('getNotification', {
      senderId,
      senderName,
      postId,
      type,
      message: `${type} your post`,
      receiverId,
    });

    await this.notificationRepository.save({
      message: `${type} your post`,
      senderName,
      type: type,
      post: { id: postId },
      user: { id: senderId },
      receiver: { id: receiverId },
    });
  }
}
