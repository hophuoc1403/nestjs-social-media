import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { UserPostEntity } from './UserPost.entity';

@Entity({ name: 'notifications' })
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  message: string;

  @ManyToOne(() => UserEntity, (user) => user.notification)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserPostEntity, (userPost) => userPost.notification)
  @JoinColumn()
  post: UserPostEntity;

  @Column()
  senderName: string;

  @ManyToOne(() => UserEntity, (user) => user.receiver)
  @JoinColumn()
  receiver: UserEntity;
}
