import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscribersDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  active: boolean;
}

export class UpdateSubscribersDto extends PartialType(CreateSubscribersDto) {}
