import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostShareEntity } from './PostShare.entity';
import { CommentEntity } from './Comment.entity';
import { UserEntity } from './User.entity';
import { SavedPostEntity } from './SavedPost.entity';
import { LikeEntity } from './Like.entity';
import { PostTagEntity } from './PostTag.entity';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  picturePath: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => PostShareEntity, (postShare) => postShare.post)
  postShare: PostShareEntity[];

  @ManyToOne(() => UserEntity, (user) => user.userPost)
  @JoinColumn()
  user: number;

  @OneToMany(() => SavedPostEntity, (savedPost) => savedPost.userPost)
  savedPost: SavedPostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.Post)
  postComment: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.post)
  like: LikeEntity[];

  @OneToMany(() => PostTagEntity, (postTag) => postTag.post)
  postTag: PostTagEntity[];
}
