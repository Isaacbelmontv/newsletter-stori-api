import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterssController } from './controllers/newsletters.controller';
import { NewslettersService } from './services/newsletters.service';
import { Newsletters } from './entities/newsletters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Newsletters])],
  controllers: [NewsletterssController],
  providers: [NewslettersService],
})
export class NewslettersModule {}
