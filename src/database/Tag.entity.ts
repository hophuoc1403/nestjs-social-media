import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostTagEntity } from './PostTag.entity';

@Entity({ name: 'tags' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PostTagEntity, (postTag) => postTag.tag)
  postTag: PostTagEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
