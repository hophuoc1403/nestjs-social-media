import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { PostEntity } from './Post.entity';

@Entity({ name: 'user_post' })
export class UserPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userPost)
  @JoinColumn()
  user: number;

  @ManyToOne(() => PostEntity, (post) => post.userPost)
  @JoinColumn()
  post: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
