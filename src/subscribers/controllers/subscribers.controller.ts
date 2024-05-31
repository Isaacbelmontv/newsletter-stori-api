import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateSubscribersDto } from '../dtos/subscribers.dto';
import { SubscribersService } from '../services/subscribers.service';

@Controller('subscribe')
export class SubscribersController {
  constructor(private subscribersService: SubscribersService) {}

  @Post()
  create(@Body() payload: CreateSubscribersDto) {
    try {
      payload.active = true;

      this.subscribersService.create(payload);
      return {
        message: 'Subscribtion created successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create Subscribtion',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
