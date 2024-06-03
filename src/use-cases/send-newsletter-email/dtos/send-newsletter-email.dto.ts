import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class sendNewsletterEmailDto {
  @IsInt()
  @IsNotEmpty()
  readonly user: number;

  @IsArray()
  @IsNotEmpty()
  readonly subscribers: number[];

  @IsInt()
  @IsNotEmpty()
  readonly newsletter: number;
}
