import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './Post.entity';
import { TagEntity } from './Tag.entity';

@Entity({ name: 'post_tag' })
export class PostTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, (post) => post.postTag, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  post: PostEntity;

  @ManyToOne(() => TagEntity, (tag) => tag.postTag, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  tag: TagEntity;
}
