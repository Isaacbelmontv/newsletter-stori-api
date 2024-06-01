import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateSubscribersDto,
  UpdateSubscribersDto,
} from '../dtos/subscribers.dto';
import { SubscribersService } from '../services/subscribers.service';

@Controller('subscribe')
export class SubscribersController {
  constructor(private subscribersService: SubscribersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() payload: CreateSubscribersDto) {
    try {
      payload.active = true;

      this.subscribersService.create(payload);
      return {
        message: 'subscription created successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create subscription',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateSubscribersDto) {
    try {
      this.subscribersService.update(id, payload);

      return {
        message: 'subscription updated successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to updated subscription',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
