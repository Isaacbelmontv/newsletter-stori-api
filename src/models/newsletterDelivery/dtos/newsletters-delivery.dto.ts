import { IsInt, IsNotEmpty } from 'class-validator';

export class NewslettersDeliveryDto {
  @IsInt()
  @IsNotEmpty()
  readonly user: number;

  @IsInt()
  @IsNotEmpty()
  readonly subscriber: number;

  @IsInt()
  @IsNotEmpty()
  readonly newsletter: number;
}
