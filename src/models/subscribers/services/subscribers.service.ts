import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscribersDto } from '../dtos/subscribers.dto';
import { Subscribers } from '../entities/subscribers.entity';
import { ISubscription } from '@interfaces/subscription.interface';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscribers)
    private subscribersRepo: Repository<Subscribers>,
  ) {}

  async create(data: CreateSubscribersDto) {
    return this.subscribersRepo.save(data);
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
}
