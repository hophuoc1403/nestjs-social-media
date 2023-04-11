import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName;

  @Column({ nullable: false })
  lastName;

  @Column({ nullable: false })
  location;

  @Column({ nullable: false })
  occupation;

  @Column({ nullable: false })
  picturePath;

  @Column({ default: 0 })
  viewedProfile: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
