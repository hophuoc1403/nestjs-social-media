import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './User.entity';
import { UserPostEntity } from './UserPost.entity';

@Entity({ name: 'saved_post' })
export class SavedPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserPostEntity, (userPost) => userPost.savedPost, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userPost: UserPostEntity;

  @ManyToOne(() => UserEntity, (user) => user.savedPost, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
