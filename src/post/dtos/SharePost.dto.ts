import { IsNotEmpty, IsString } from 'class-validator';

export class SharePostDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
