import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { NewslettersDeliveryModule } from './models/newsletterDelivery/newsletters-delivery.module';
import { NewslettersModule } from './models/newsletters/newsletters.module';
import { SeedService } from './services/seed.service';
import { SubscribersModule } from './models/subscribers/subscribers.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    UsersModule,
    SubscribersModule,
    NewslettersModule,
    NewslettersDeliveryModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}
  async onModuleInit() {
    await this.seedService.seedData();
  }
}
