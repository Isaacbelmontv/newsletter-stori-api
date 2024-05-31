import { NewslettersDelivery } from '@models/newsletterDelivery/entities/newsletters-delivery.entity';
import { Newsletters } from '@models/newsletters/entities/newsletters.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { Users } from './entities/users.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Newsletters, NewslettersDelivery]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
