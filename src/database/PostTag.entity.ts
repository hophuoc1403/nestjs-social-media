import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './Post.entity';
import { TagEntity } from './Tag.entity';

@Entity({ name: 'post_tag' })
export class PostTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, (post) => post.postTag)
  @JoinColumn()
  post: number;

  @ManyToOne(() => TagEntity, (tag) => tag.postTag)
  @JoinColumn()
  tag: number;
}
