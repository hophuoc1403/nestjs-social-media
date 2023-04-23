import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './User.entity';
import { PostEntity } from './Post.entity';

@Entity({ name: 'saved_post' })
export class SavedPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, (userPost) => userPost.savedPost)
  @JoinColumn()
  userPost: number;

  @ManyToOne(() => UserEntity, (user) => user.savedPost)
  @JoinColumn()
  user: number;
}
