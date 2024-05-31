import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscribersDto } from '../dtos/subscribers.dto';
import { Subscribers } from '../entities/subscribers.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscribers)
    private subscribersRepo: Repository<Subscribers>,
  ) {}

  async create(data: CreateSubscribersDto) {
    return this.subscribersRepo.save(data);
  }
}
