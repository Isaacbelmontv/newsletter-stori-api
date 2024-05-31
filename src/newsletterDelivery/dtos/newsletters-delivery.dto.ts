import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateNewslettersDeliveryDto {
  @IsInt()
  @IsNotEmpty()
  readonly users: number;

  @IsInt()
  @IsNotEmpty()
  readonly subscribers: number;

  @IsInt()
  @IsNotEmpty()
  readonly newsletters: number;
}
