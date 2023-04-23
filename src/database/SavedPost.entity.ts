import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserPostEntity } from './UserPost.entity';
import { UserEntity } from './User.entity';

@Entity({ name: 'saved_post' })
export class SavedPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserPostEntity, (userPost) => userPost.savedPost)
  @JoinColumn()
  userPost: number;

  @ManyToOne(() => UserEntity, (user) => user.savedPost)
  @JoinColumn()
  user: number;
}
