import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './User.entity';
import { UserPostEntity } from './UserPost.entity';

@Entity({ name: 'report_post' })
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
  user: UserEntity;

  @ManyToOne(() => UserPostEntity, (userPost) => userPost.reportPost, {
    onDelete: 'CASCADE',
  })
  post: UserPostEntity;
}
