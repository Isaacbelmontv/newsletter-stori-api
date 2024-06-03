import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class UsersDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;
}

export class CreateUsersDto extends UsersDto {
  @IsNotEmpty()
  readonly role: string;
}
