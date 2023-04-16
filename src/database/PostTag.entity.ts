import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './Post.entity';
import { TagEntity } from './Tag.entity';

@Entity('post_tag')
export class PostTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, (post) => post.id)
  @JoinColumn()
  post: number;

  @ManyToOne(() => TagEntity, (tag) => tag.id)
  @JoinColumn()
  tag: number;
}
