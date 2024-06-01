import { NewslettersDeliveryModule } from '@models/newsletterDelivery/newsletters-delivery.module';
import { NewslettersModule } from '@models/newsletters/newsletters.module';
import { SubscribersModule } from '@models/subscribers/subscribers.module';
import { UsersModule } from '@models/users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from '@services/mail.service';
import { SeedService } from '@services/seed.service';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { sendNewsletterEmailModule } from '@use-cases/send-newsletter-email/send-newsletter-email.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: 2525,
          secure: false,
          auth: {
            user: configService.get('EMAIL_USERNAME'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV],
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
    sendNewsletterEmailModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService, MailService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}
  async onModuleInit() {
    await this.seedService.seedData();
  }
}
