import { Newsletters } from '@models/newsletters/entities/newsletters.entity';
import { Subscribers } from '@models/subscribers/entities/subscribers.entity';
import { Users } from '@models/users/entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        { email: 'admin@stori.com', password: '123456', role: 'admin' },
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
