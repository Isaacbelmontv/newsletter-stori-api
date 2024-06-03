import {
  Body,
  Controller,
  Get,
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
  async create(@Body() payload: CreateSubscribersDto) {
    try {
      await this.subscribersService.create(payload);
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

  @Get(':email')
  async get(@Param('email') email: string) {
    try {
      const subscriptions = await this.subscribersService.findByEmail(email);

      if (!subscriptions) {
        throw new HttpException(
          'No subscriptions found for the given email',
          HttpStatus.NOT_FOUND,
        );
      }

      return subscriptions;
    } catch (error) {
      throw new HttpException(
        'Failed to get subscriptions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAll() {
    try {
      const subscriptions = await this.subscribersService.findAll();

      if (!subscriptions) {
        throw new HttpException('No subscriptions found', HttpStatus.NOT_FOUND);
      }

      return subscriptions;
    } catch (error) {
      throw new HttpException(
        'Failed to get subscriptions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
