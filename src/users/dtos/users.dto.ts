import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;
}