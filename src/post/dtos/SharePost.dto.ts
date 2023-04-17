import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SharePostDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
