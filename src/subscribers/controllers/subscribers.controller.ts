import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubscribersDto } from '../dtos/subscribers.dto';
import { SubscribersService } from '../services/subscribers.service';

@Controller('subscribe')
export class SubscribersController {
  constructor(private subscribersService: SubscribersService) {}

  @Post()
  create(@Body() payload: CreateSubscribersDto) {
    payload.active = true;
    return this.subscribersService.create(payload);
  }
}
