import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './Post.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  location: string;

  @Column({ nullable: false })
  occupation: string;

  @Column({ nullable: false })
  picturePath: string;

  @Column({ default: 0 })
  viewedProfile: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role: string;

  @OneToMany(() => PostEntity, (post) => post.userId)
  post: PostEntity;

  @OneToMany(() => PostEntity, (post) => post.userIdRoot)
  postRoot: PostEntity;
}
