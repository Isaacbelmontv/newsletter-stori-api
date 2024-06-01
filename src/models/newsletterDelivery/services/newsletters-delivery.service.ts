import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Newsletters } from '../../newsletters/entities/newsletters.entity';
import { Subscribers } from '../../subscribers/entities/subscribers.entity';
import { Users } from '../../users/entities/users.entity';
import { NewslettersDeliveryDto } from '../dtos/newsletters-delivery.dto';
import { NewslettersDelivery } from '../entities/newsletters-delivery.entity';

@Injectable()
export class NewslettersDeliveryService {
  constructor(
    @InjectRepository(NewslettersDelivery)
    private newslettersDeliveryRepo: Repository<NewslettersDelivery>,
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    @InjectRepository(Subscribers)
    private subscribersRepo: Repository<Subscribers>,
    @InjectRepository(Newsletters)
    private newslettersRepo: Repository<Newsletters>,
  ) {}

  async create(data: NewslettersDeliveryDto) {
    const newNewsletterDelivery = this.newslettersDeliveryRepo.create();

    if (data.user) {
      const user = await this.userRepo.findOne({ where: { id: data.user } });
      if (user) {
        newNewsletterDelivery.user = user;
      } else {
        throw new Error('User not found');
      }
    }

    if (data.subscriber) {
      const subscriber = await this.subscribersRepo.findOne({
        where: { id: data.subscriber },
      });
      if (subscriber) {
        newNewsletterDelivery.subscriber = [subscriber];
      } else {
        throw new Error('Subscriber not found');
      }
    }

    if (data.newsletter) {
      const newsletter = await this.newslettersRepo.findOne({
        where: { id: data.newsletter },
      });
      if (newsletter) {
        newNewsletterDelivery.newsletter = [newsletter];
      } else {
        throw new Error('Newsletter not found');
      }
    }

    return this.newslettersDeliveryRepo.save(newNewsletterDelivery);
  }
}
