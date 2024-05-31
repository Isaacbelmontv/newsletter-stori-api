import { Users } from '@models/users/entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewslettersDto } from '../dtos/newsletters.dto';
import { Newsletters } from '../entities/newsletters.entity';

@Injectable()
export class NewslettersService {
  constructor(
    @InjectRepository(Newsletters)
    private newslettersRepo: Repository<Newsletters>,
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
  ) {}

  async create(data: CreateNewslettersDto) {
    const newNewsletter = new Newsletters();
    newNewsletter.title = data.title;
    newNewsletter.content = data.content;
    newNewsletter.assets = data.assets;

    if (data.user) {
      const user = await this.userRepo.findOne({ where: { id: data.user } });
      if (user) {
        newNewsletter.user = user;
      } else {
        throw new Error('User not found');
      }
    }

    return this.newslettersRepo.save(newNewsletter);
  }
}
