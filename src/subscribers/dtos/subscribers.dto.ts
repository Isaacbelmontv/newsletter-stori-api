import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscribersDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  active: boolean;
}
