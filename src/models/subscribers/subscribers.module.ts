import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribersController } from './controllers/subscribers.controller';
import { SubscribersService } from './services/subscribers.service';
import { Subscribers } from './entities/subscribers.entity';
import { Newsletters } from '@models/newsletters/entities/newsletters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribers, Newsletters])],
  controllers: [SubscribersController],
  providers: [SubscribersService],
  exports: [SubscribersService],
})
export class SubscribersModule {}
