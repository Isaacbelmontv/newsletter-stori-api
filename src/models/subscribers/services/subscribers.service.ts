import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateSubscribersDto,
  UpdateSubscribersDto,
} from '../dtos/subscribers.dto';
import { Subscribers } from '../entities/subscribers.entity';
import { ISubscription } from '@interfaces/subscription.interface';
import { Newsletters } from '@models/newsletters/entities/newsletters.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscribers)
    private subscribersRepo: Repository<Subscribers>,
    @InjectRepository(Newsletters)
    private newslettersRepo: Repository<Newsletters>,
  ) {}

  async create(data: CreateSubscribersDto) {
    try {
      const newSubscribers = new Subscribers();
      newSubscribers.active = true;
      newSubscribers.email = data.email;

      if (data.newsletters) {
        const newsletters = await this.newslettersRepo.findOne({
          where: { id: data.newsletters },
        });

        if (newsletters) {
          newSubscribers.newsletters = newsletters;
        } else {
          throw new Error('newsletters not found');
        }
      }

      return this.subscribersRepo.save(newSubscribers);
    } catch (error) {
      throw new Error('subscriptions error');
    }
  }

  async update(id: number, changes: UpdateSubscribersDto) {
    const subscription = await this.subscribersRepo.findOne({ where: { id } });
    if (subscription) {
      this.subscribersRepo.merge(subscription, changes);
    }

    return this.subscribersRepo.save(subscription);
  }

  async getActiveSubscriptions(
    subscriptions: number[],
  ): Promise<ISubscription[]> {
    try {
      const subscribers = await this.subscribersRepo
        .createQueryBuilder('subscriber')
        .select(['subscriber.id', 'subscriber.email'])
        .where('subscriber.id IN (:...subscriptions)', { subscriptions })
        .andWhere('subscriber.active = :active', { active: true })
        .getMany();

      return subscribers.map((subscriber: ISubscription) => ({
        id: subscriber.id,
        email: subscriber.email,
      }));
    } catch (error) {
      throw new Error('Failed to fetch subscriptions');
    }
  }

  async findByEmail(email: string) {
    try {
      const subscribers = await this.subscribersRepo.find({
        where: { email },
        relations: ['newsletters'],
        select: ['id', 'email', 'active'],
      });

      if (!subscribers.length) {
        return null;
      }

      return subscribers;
    } catch (error) {
      throw new Error(`Failed to get subscriptions by email`);
    }
  }
}
