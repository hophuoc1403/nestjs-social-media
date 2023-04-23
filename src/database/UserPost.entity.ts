import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { PostEntity } from './Post.entity';
import { SavedPostEntity } from './SavedPost.entity';

@Entity({ name: 'user_post' })
export class UserPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.userPost)
  @JoinColumn()
  user: number;

  @ManyToOne(() => PostEntity, (post) => post.userPost)
  @JoinColumn()
  post: number;

  @OneToMany(() => SavedPostEntity, (savedPost) => savedPost.userPost)
  savedPost: SavedPostEntity[];
}
