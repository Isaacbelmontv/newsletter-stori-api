import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribersController } from './controllers/subscribers.controller';
import { SubscribersService } from './services/subscribers.service';
import { Subscribers } from './entities/subscribers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribers])],
  controllers: [SubscribersController],
  providers: [SubscribersService],
  exports: [SubscribersService],
})
export class SubscribersModule {}
