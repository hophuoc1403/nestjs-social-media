import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './Post.entity';
import { UserEntity } from './User.entity';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  comment: string;

  @Column()
  commentRoot: string;

  @OneToOne(() => PostEntity)
  @JoinColumn()
  postId: PostEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  userId: UserEntity;
}
