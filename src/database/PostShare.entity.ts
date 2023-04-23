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
import { CommentEntity } from './Comment.entity';
import { LikeEntity } from './Like.entity';

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

  @OneToMany(() => CommentEntity, (comment) => comment.sharePost)
  sharePostComment: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.postShare)
  like: LikeEntity[];
}
