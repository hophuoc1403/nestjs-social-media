import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'topic' })
export class TopicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
