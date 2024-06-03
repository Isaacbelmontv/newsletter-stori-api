import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscribersDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  active: boolean;

  @IsNotEmpty()
  readonly newsletters: number;
}

export class UpdateSubscribersDto {
  active: boolean;
}
