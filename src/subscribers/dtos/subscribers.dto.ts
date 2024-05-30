import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateSubscribersDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  active: boolean;
}
