import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserPostEntity } from './UserPost.entity';
import { UserEntity } from './User.entity';

@Entity({ name: 'likes' })
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserPostEntity, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  post: UserPostEntity;

  @ManyToOne(() => UserEntity, (user) => user.userLike, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
