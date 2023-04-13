import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserFriendDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  friendId: number;
}
