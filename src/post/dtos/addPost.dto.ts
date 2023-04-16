import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddPostDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  userRootId: number;

  sharedContent: string;

  picturePath?: string;
}
