import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './User.entity';

@Entity('userFriend')
export class UserFriendEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userFriend)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.userFriendId)
  @JoinColumn()
  friend: UserEntity;
}
