import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Newsletters } from './newsletters/entities/newsletters.entity';
import { Subscribers } from './subscribers/entities/subscribers.entity';
import { Users } from './users/entities/users.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(Newsletters)
    private newslettersRepo: Repository<Newsletters>,
    @InjectRepository(Subscribers)
    private subscribersRepo: Repository<Subscribers>,
  ) {}

  async seedData() {
    await Promise.all([
      this.userRepo.save([
        { email: 'admin@stori.com', password: 'admin', role: 'admin' },
      ]),
      this.newslettersRepo.save([
        {
          title: 'PROMO',
          content: 'tarjetas con credito infinito',
          users: 1,
        },
      ]),
      this.subscribersRepo.save([
        {
          active: true,
          email: 'isaacbelmontv@gmail.com',
        },
      ]),
    ]);
  }
}