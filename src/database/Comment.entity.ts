import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './Post.entity';
import { PostShareEntity } from './PostShare.entity';
import { UserPostEntity } from './UserPost.entity';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column()
  parentCommentId: number;

  @ManyToOne(() => UserPostEntity, (post) => post.postComment)
  @JoinColumn()
  Post: number;

  @ManyToOne(() => PostShareEntity, (postShare) => postShare.sharePostComment)
  @JoinColumn()
  sharePost: number;
}
