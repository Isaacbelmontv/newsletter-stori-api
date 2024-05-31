import { Users } from '@models/users/entities/users.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewslettersController } from './controllers/newsletters.controller';
import { Newsletters } from './entities/newsletters.entity';
import { NewslettersService } from './services/newsletters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Newsletters, Users])],
  controllers: [NewslettersController],
  providers: [NewslettersService],
})
export class NewslettersModule {}
