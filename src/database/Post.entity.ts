import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { LikeEntity } from './Like.entity';
import { CommentEntity } from './Comment.entity';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column()
  picturePath: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  createdAtRoot: Date;

  @Column()
  shareContent: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  userId: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  userIdRoot: UserEntity;

  @OneToMany(() => LikeEntity, (like) => like.postId)
  likes: LikeEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.postId)
  comments: CommentEntity;
}
