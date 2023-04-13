import { IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  occupation: string;
}
