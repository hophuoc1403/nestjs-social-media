import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from '../database/Chat.entity';
import { Repository } from 'typeorm';
import { RoomChatEntity } from '../database/RoomChat.entity';
import { UserEntity } from '../database/User.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    @InjectRepository(RoomChatEntity)
    private roomChatRepository: Repository<RoomChatEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getMessages(members: number[]) {
    const query = await this.roomChatRepository
      .createQueryBuilder('room')
      .where(
        '(room.member1 = :userId1 AND room.member2 = :userId2) OR (room.member1 = :userId2 AND room.member2 = :userId1)',
      )
      .setParameter('userId1', members[0])
      .setParameter('userId2', members[1])
      .execute();

    const allMessages = await this.chatRepository.find({
      where: { room: { id: query[0].room_id } },
      relations: ['sender'],
    });

    const roomInfo = await this.roomChatRepository.findOne({
      where: { id: +query[0].room_id },
      // relations: ['member1', 'member2'],
    });

    return { messages: allMessages, room: roomInfo };
  }
}
