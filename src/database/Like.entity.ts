import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostShareEntity } from './PostShare.entity';
import { PostEntity } from './Post.entity';

@Entity({ name: 'likes' })
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, (post) => post.like)
  @JoinColumn()
  post: number;

  @ManyToOne(() => PostShareEntity, (postShare) => postShare.like)
  @JoinColumn()
  postShare: number;
}
