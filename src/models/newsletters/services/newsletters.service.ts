import { Users } from '@models/users/entities/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewslettersDto } from '../dtos/newsletters.dto';
import { Newsletters } from '../entities/newsletters.entity';
import { INewsletter } from '@interfaces/newsletter.inferce';

@Injectable()
export class NewslettersService {
  constructor(
    @InjectRepository(Newsletters)
    private newslettersRepo: Repository<Newsletters>,
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
  ) {}

  async create(data: CreateNewslettersDto) {
    try {
      const newNewsletter = new Newsletters();
      newNewsletter.title = data.title;
      newNewsletter.content = data.content;

      if (data.assetFile) {
        newNewsletter.assetFile = data.assetFile.buffer;
        newNewsletter.assetName = data.assetFile.originalname;
        newNewsletter.assetType = data.assetFile.encoding;
      }

      if (data.user) {
        const user = await this.userRepo.findOne({ where: { id: data.user } });
        if (user) {
          newNewsletter.user = user;
        } else {
          throw new Error('User not found');
        }
      }

      return this.newslettersRepo.save(newNewsletter);
    } catch (error) {
      throw new Error(`Error creating newsletter: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<INewsletter> {
    const newsletter = await this.newslettersRepo
      .createQueryBuilder('newsletter')
      .select([
        'newsletter.id AS id',
        'newsletter.title AS title',
        'newsletter.content AS content',
        'newsletter.assetFile AS assetFile',
        'newsletter.assetName AS assetName',
        'newsletter.assetType AS assetType',
      ])
      .where('newsletter.id = :id', { id })
      .getRawOne();

    if (!newsletter) {
      throw new NotFoundException(`Newsletters #${id} not found`);
    }
    return newsletter;
  }
}
