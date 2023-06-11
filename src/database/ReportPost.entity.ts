import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { UserPostEntity } from './UserPost.entity';

@Entity({ name: 'reported_post' })
export class ReportPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.reportPost, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserPostEntity, (userPost) => userPost.reportPost, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  post: UserPostEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
