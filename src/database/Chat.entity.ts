import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { RoomChatEntity } from './RoomChat.entity';

@Entity({ name: 'chat' })
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => UserEntity, (user) => user.chat)
  @JoinColumn()
  sender: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => RoomChatEntity, (room) => room.chat)
  @JoinColumn()
  room: RoomChatEntity;
}
