import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewslettersDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  assets: Express.Multer.File;

  @IsNotEmpty()
  readonly user: number;
}
