import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { sendNewsletterEmailDto } from '../dtos/send-newsletter-email.dto';
import { SendNewsletterEmailUseCases } from '../send-newsletter-email.use-case';

@Controller('send-newsletter')
export class sendNewsletterEmailController {
  constructor(
    private sendNewsletterEmailUseCases: SendNewsletterEmailUseCases,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() payload: sendNewsletterEmailDto) {
    try {
      await this.sendNewsletterEmailUseCases.sendNewsLetterEMail(payload);
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
