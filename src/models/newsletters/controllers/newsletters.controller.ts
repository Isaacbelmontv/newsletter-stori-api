import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNewslettersDto } from '../dtos/newsletters.dto';
import { NewslettersService } from '../services/newsletters.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('newsletters')
export class NewslettersController {
  constructor(private newslettersService: NewslettersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('assetFile'))
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Body() payload: CreateNewslettersDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        payload.assetFile = file;
      }

      await this.newslettersService.create(payload);
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

  @Get()
  async get() {
    try {
      const newsletters = await this.newslettersService.findAll();

      if (!newsletters) {
        throw new HttpException('No newsletters', HttpStatus.NOT_FOUND);
      }

      return newsletters;
    } catch (error) {
      throw new HttpException(
        'Failed to get newsletters',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
