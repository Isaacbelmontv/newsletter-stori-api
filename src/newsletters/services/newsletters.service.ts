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
  ) {}

  async create(data: CreateNewslettersDto) {
    return this.newslettersRepo.save(data);
  }
}
