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
import { UserEntity } from './User.entity';
import { LikeEntity } from './Like.entity';
import { CommentEntity } from './Comment.entity';
import { TagEntity } from './Tag.entity';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column()
  picturePath: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  createdAtRoot: Date;

  @Column()
  sharedContent: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  userRoot: UserEntity;
  se;
  @OneToMany(() => LikeEntity, (like) => like.postId)
  likes: LikeEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.postId)
  comments: CommentEntity;

  // @OneToMany(() => PostTagEntity, (postTag) => postTag.post)
  // tags: TagEntity[];
  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'post_tag',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[];
}
