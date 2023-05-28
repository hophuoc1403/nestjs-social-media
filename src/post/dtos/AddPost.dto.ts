import { IsNotEmpty, IsString } from 'class-validator';

export class AddPostDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  tags: number[];
}
