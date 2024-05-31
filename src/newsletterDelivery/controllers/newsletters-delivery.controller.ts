import { Body, Controller, Post } from '@nestjs/common';
import { CreateNewslettersDeliveryDto } from '../dtos/newsletters-delivery.dto';
import { NewslettersDeliveryService } from '../services/newsletters-delivery.service';

@Controller('newsletters-delivery')
export class NewslettersDeliveryController {
  constructor(private newslettersDeliveryService: NewslettersDeliveryService) {}

  @Post()
  create(@Body() payload: CreateNewslettersDeliveryDto) {
    return this.newslettersDeliveryService.create(payload);
  }
}
