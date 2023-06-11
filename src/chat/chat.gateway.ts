import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from '../database/Chat.entity';
import { Repository } from 'typeorm';
import { RoomChatEntity } from '../database/RoomChat.entity';
import { UserEntity } from '../database/User.entity';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class ChatGateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    @InjectRepository(RoomChatEntity)
    private roomChatRepository: Repository<RoomChatEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  @SubscribeMessage('getMessage')
  async onNewMessage(
    socket,
    data: { senderId: number; message: string; roomId: number },
  ) {
    const { senderId, roomId, message } = data;
    console.log('sendings');
    const createdAt = new Date().toString();
    socket.join(roomId.toString());
    this.server
      .in(roomId.toString())
      .emit('sendMessage', { senderId, createdAt, message });
    await this.chatRepository.save({
      message,
      room: { id: roomId },
      sender: { id: senderId },
    });
    this.server
      .in(roomId.toString())
      .emit('sendAmountMessage', { senderId, createdAt, message, roomId });
    return 'ok';
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket, data) {
    const members: number[] = data.members;
    const query = this.roomChatRepository
      .createQueryBuilder('room')
      .where(
        '(room.member1 = :userId1 AND room.member2 = :userId2) OR (room.member1 = :userId2 AND room.member2 = :userId1)',
      )
      .setParameter('userId1', members[0])
      .setParameter('userId2', members[1]);
    const isExistRoom = await query.getOne();

    if (isExistRoom) {
      socket.join(isExistRoom.id);
      return;
    }

    const roomAdded = await this.roomChatRepository.save({
      member1: { id: +members[0] },
      member2: { id: +members[1] },
    });
    socket.join(roomAdded.id);
  }
}
