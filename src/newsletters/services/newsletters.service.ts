import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewslettersDto } from '../dtos/newsletters.dto';
import { Newsletters } from '../entities/newsletters.entity';
import { Users } from '../../users/entities/users.entity';

@Injectable()
export class NewslettersService {
  constructor(
    @InjectRepository(Newsletters)
    private newslettersRepo: Repository<Newsletters>,
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
  ) {}

  async create(data: CreateNewslettersDto) {
    const newNewsletter = this.newslettersRepo.create(data);

    if (data.users) {
      const user = await this.userRepo.findOne({ where: { id: data.users } });
      if (user) {
        newNewsletter.user = user;
      } else {
        throw new Error('User not found');
      }
    }

    return this.newslettersRepo.save(newNewsletter);
  }
}
