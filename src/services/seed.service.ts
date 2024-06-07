import { Users } from '@models/users/entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async seedData() {
    await this.userRepo.save([
      { email: 'admin@stori.com', password: '123456', role: 'admin' },
    ]);
  }
}
