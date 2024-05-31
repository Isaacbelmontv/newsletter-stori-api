import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewslettersDeliveryController } from './controllers/newsletters-delivery.controller';
import { NewslettersDeliveryService } from './services/newsletters-delivery.service';
import { NewslettersDelivery } from './entities/newsletters-delivery.entity';
import { Subscribers } from 'src/models/subscribers/entities/subscribers.entity';
import { Newsletters } from 'src/models/newsletters/entities/newsletters.entity';
import { Users } from 'src/models/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewslettersDelivery,
      Users,
      Subscribers,
      Newsletters,
    ]),
  ],
  controllers: [NewslettersDeliveryController],
  providers: [NewslettersDeliveryService],
})
export class NewslettersDeliveryModule {}
