import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { PostEntity } from './Post.entity';

@Entity({ name: 'post_share' })
export class PostShareEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.postShare)
  @JoinColumn()
  user: number;

  @ManyToOne(() => PostEntity, (post) => post.postShare)
  @JoinColumn()
  post: number;

  @Column()
  sharedContent: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
