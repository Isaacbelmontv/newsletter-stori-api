import { Body, Controller, Post } from '@nestjs/common';
import { CreateNewslettersDto } from '../dtos/newsletters.dto';
import { NewslettersService } from '../services/newsletters.service';

@Controller('newsletters')
export class NewslettersController {
  constructor(private newsletterssService: NewslettersService) {}

  @Post()
  create(@Body() payload: CreateNewslettersDto) {
    return this.newsletterssService.create(payload);
  }
}
