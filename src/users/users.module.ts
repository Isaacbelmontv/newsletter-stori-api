import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Users } from './entities/users.entity';
import { NewslettersDelivery } from 'src/newsletterDelivery/entities/newsletters-delivery.entity';
import { Newsletters } from 'src/newsletters/entities/newsletters.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Newsletters, NewslettersDelivery]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
