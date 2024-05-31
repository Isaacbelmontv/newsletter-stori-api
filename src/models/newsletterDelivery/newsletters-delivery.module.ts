import { Newsletters } from '@models/newsletters/entities/newsletters.entity';
import { Subscribers } from '@models/subscribers/entities/subscribers.entity';
import { Users } from '@models/users/entities/users.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewslettersDeliveryController } from './controllers/newsletters-delivery.controller';
import { NewslettersDelivery } from './entities/newsletters-delivery.entity';
import { NewslettersDeliveryService } from './services/newsletters-delivery.service';

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
