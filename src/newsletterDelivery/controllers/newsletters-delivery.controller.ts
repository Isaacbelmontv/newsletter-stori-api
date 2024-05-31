import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateNewslettersDeliveryDto } from '../dtos/newsletters-delivery.dto';
import { NewslettersDeliveryService } from '../services/newsletters-delivery.service';

@Controller('newsletters-delivery')
export class NewslettersDeliveryController {
  constructor(private newslettersDeliveryService: NewslettersDeliveryService) {}

  @Post()
  create(@Body() payload: CreateNewslettersDeliveryDto) {
    try {
      this.newslettersDeliveryService.create(payload);
      return {
        message: 'newsletters delivery created successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create newsletters delivery',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
