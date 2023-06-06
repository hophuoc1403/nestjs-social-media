import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagEntity } from './Tag.entity';
import { UserEntity } from './User.entity';
import { SavedPostEntity } from './SavedPost.entity';
import { CommentEntity } from './Comment.entity';
import { LikeEntity } from './Like.entity';
import { PostEntity } from './Post.entity';
import { NotificationEntity } from './Notification.entity';
import { ReportPost } from './ReportPost.entity';
// import { TagEntity } from './Tag.entity';

@Entity({ name: 'user_post' })
export class UserPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userPost, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.userRoot, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userRoot: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.post, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  post: PostEntity;

  @Column({ nullable: true })
  sharedContent: string;

  @OneToMany(() => SavedPostEntity, (savedPost) => savedPost.userPost)
  savedPost: SavedPostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.post)
  likes: LikeEntity[];

  @OneToMany(() => NotificationEntity, (noti) => noti.post)
  notification: NotificationEntity[];

  @OneToMany(() => ReportPost, (report) => report.post)
  reportPost: ReportPost[];

  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'post_tag',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'post',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[];
}
