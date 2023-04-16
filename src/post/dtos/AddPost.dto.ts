import { IsNotEmpty, IsString } from 'class-validator';

export class AddPostDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  tags: number[];
}
