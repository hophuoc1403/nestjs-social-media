import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPostEntity } from './UserPost.entity';
import { PostShareEntity } from './PostShare.entity';
import { SavedPostEntity } from './SavedPost.entity';

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

  @OneToMany(() => UserPostEntity, (userPost) => userPost.user)
  userPost: UserPostEntity[];
  @OneToMany(() => PostShareEntity, (postShare) => postShare.user)
  postShare: PostShareEntity[];

  @OneToMany(() => SavedPostEntity, (savedPost) => savedPost.user)
  savedPost: SavedPostEntity[];
  //
  // @ManyToMany(() => PostEntity)
  // @JoinTable({
  //   name: 'user_post',
  //   joinColumn: {
  //     name: 'userId',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'postId',
  //     referencedColumnName: 'id',
  //   },
  // })
  // posts: PostEntity[];
}
