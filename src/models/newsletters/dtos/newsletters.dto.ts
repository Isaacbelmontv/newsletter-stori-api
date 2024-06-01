import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewslettersDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsOptional()
  assetFile: Express.Multer.File;

  @IsNotEmpty()
  readonly user: number;
}
