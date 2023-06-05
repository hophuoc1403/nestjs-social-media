import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { ChatEntity } from './Chat.entity';

@Entity({ name: 'room_chat' })
export class RoomChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.chatMember1, {
    onDelete: 'CASCADE',
  })
  member1: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.chatMember2, {
    onDelete: 'CASCADE',
  })
  member2: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => ChatEntity, (chat) => chat.room)
  chat: ChatEntity;
}
