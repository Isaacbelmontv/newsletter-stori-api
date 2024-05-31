import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateNewslettersDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  readonly assets: Buffer;

  @IsInt()
  @IsNotEmpty()
  readonly users: number;
}
