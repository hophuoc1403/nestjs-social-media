import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikePostDto {
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
