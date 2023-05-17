import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPostEntity } from './UserPost.entity';
import { UserEntity } from './User.entity';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  parentCommentId: number;

  @ManyToOne(() => UserPostEntity, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  post: UserPostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
