import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPostEntity } from './UserPost.entity';
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

  @OneToMany(() => UserPostEntity, (userPost) => userPost.post)
  post: UserPostEntity;

  @OneToMany(() => PostTagEntity, (postTag) => postTag.post)
  postTag: PostTagEntity[];
}
