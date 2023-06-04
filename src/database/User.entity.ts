import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SavedPostEntity } from './SavedPost.entity';
import { UserFriendEntity } from './UserFriend.entity';
import { UserPostEntity } from './UserPost.entity';
import { CommentEntity } from './Comment.entity';
import { LikeEntity } from './Like.entity';
import { RoomChatEntity } from './RoomChat.entity';
import { ChatEntity } from './Chat.entity';
import { NotificationEntity } from './Notification.entity';
import { StoryEntity } from './Story.entity';

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

  @OneToMany(() => UserPostEntity, (post) => post.user)
  userPost: UserPostEntity[];

  @OneToMany(() => UserPostEntity, (post) => post.userRoot)
  userRoot: UserPostEntity[];

  @OneToMany(() => SavedPostEntity, (savedPost) => savedPost.user)
  savedPost: SavedPostEntity[];

  @OneToMany(() => UserFriendEntity, (userFriend) => userFriend.user)
  friends: UserFriendEntity[];

  @OneToMany(() => UserFriendEntity, (userFriend) => userFriend.friend)
  userFriendId: UserFriendEntity[];

  @OneToMany(() => CommentEntity, (cmt) => cmt.user)
  comment: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  userLike: LikeEntity[];

  @OneToMany(() => RoomChatEntity, (room) => room.member1)
  chatMember1: RoomChatEntity[];

  @OneToMany(() => RoomChatEntity, (room) => room.member1)
  chatMember2: RoomChatEntity[];

  @OneToMany(() => ChatEntity, (chat) => chat.sender)
  chat: ChatEntity[];

  @OneToMany(() => NotificationEntity, (noti) => noti.user)
  notification: NotificationEntity[];
  @OneToMany(() => NotificationEntity, (noti) => noti.receiver)
  receiver: NotificationEntity[];

  @OneToMany(() => StoryEntity, (story) => story.user)
  story: StoryEntity[];
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
