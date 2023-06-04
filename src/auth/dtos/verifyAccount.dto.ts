import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyAccountDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class ResetAccountDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
