import { IsNotEmpty, IsString } from 'class-validator';

export class EditPostDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  pictureDelete?: string;
}
