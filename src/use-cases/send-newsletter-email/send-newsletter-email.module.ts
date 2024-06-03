import { NewslettersDeliveryModule } from '@models/newsletterDelivery/newsletters-delivery.module';
import { Module } from '@nestjs/common';
import { MailService } from '@services/mail.service';
import { sendNewsletterEmailController } from './controllers/send-newsletter-email.controller';
import { SendNewsletterEmailUseCases } from './send-newsletter-email.use-case';
import { UsersModule } from '@models/users/users.module';
import { SubscribersModule } from '@models/subscribers/subscribers.module';
import { NewslettersModule } from '@models/newsletters/newsletters.module';

@Module({
  imports: [
    NewslettersDeliveryModule,
    UsersModule,
    SubscribersModule,
    NewslettersModule,
  ],
  controllers: [sendNewsletterEmailController],
  providers: [SendNewsletterEmailUseCases, MailService],
})
export class sendNewsletterEmailModule {}
