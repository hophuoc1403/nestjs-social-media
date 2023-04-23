import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPostEntity } from './UserPost.entity';
import { PostShareEntity } from './PostShare.entity';

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

  @OneToMany(() => UserPostEntity, (userPost) => userPost.post)
  userPost: UserPostEntity[];

  @OneToMany(() => PostShareEntity, (postShare) => postShare.post)
  postShare: PostShareEntity[];
}
