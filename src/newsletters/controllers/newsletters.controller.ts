import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNewslettersDto } from '../dtos/newsletters.dto';
import { NewslettersService } from '../services/newsletters.service';

@Controller('newsletters')
export class NewslettersController {
  constructor(private newslettersService: NewslettersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() payload: CreateNewslettersDto) {
    try {
      this.newslettersService.create(payload);
      return {
        message: 'newsletters created successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create newsletters',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
