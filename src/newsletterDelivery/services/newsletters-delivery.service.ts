import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewslettersDeliveryDto } from '../dtos/newsletters-delivery.dto';
import { NewslettersDelivery } from '../entities/newsletters-delivery.entity';
import { Users } from '../../users/entities/users.entity';
import { Subscribers } from '../../subscribers/entities/subscribers.entity';
import { Newsletters } from '../../newsletters/entities/newsletters.entity';

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

  async create(data: CreateNewslettersDeliveryDto) {
    const newNewsletterDelivery = this.newslettersDeliveryRepo.create();

    if (data.users) {
      const user = await this.userRepo.findOne({ where: { id: data.users } });
      if (user) {
        newNewsletterDelivery.user = user;
      } else {
        throw new Error('User not found');
      }
    }

    if (data.subscribers) {
      const subscriber = await this.subscribersRepo.findOne({
        where: { id: data.subscribers },
      });
      if (subscriber) {
        newNewsletterDelivery.subscribers = [subscriber];
      } else {
        throw new Error('Subscriber not found');
      }
    }

    if (data.newsletters) {
      const newsletter = await this.newslettersRepo.findOne({
        where: { id: data.newsletters },
      });
      if (newsletter) {
        newNewsletterDelivery.newsletters = [newsletter];
      } else {
        throw new Error('Newsletter not found');
      }
    }

    return this.newslettersDeliveryRepo.save(newNewsletterDelivery);
  }
}
