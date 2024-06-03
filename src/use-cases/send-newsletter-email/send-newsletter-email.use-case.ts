import { Injectable } from '@nestjs/common';
import { MailService } from '@services/mail.service';
import { sendNewsletterEmailDto } from './dtos/send-newsletter-email.dto';
import { NewslettersDeliveryService } from '@models/newsletterDelivery/services/newsletters-delivery.service';
import { SubscribersService } from '@models/subscribers/services/subscribers.service';
import { NewslettersService } from '@models/newsletters/services/newsletters.service';
import { ISubscription } from '@interfaces/subscription.interface';

@Injectable()
export class SendNewsletterEmailUseCases {
  constructor(
    private subscribersService: SubscribersService,
    private newsletterService: NewslettersService,
    private mailService: MailService,
    private newslettersDeliveryService: NewslettersDeliveryService,
  ) {}

  async sendNewsLetterEMail(data: sendNewsletterEmailDto) {
    try {
      const subscriptions =
        await this.subscribersService.getActiveSubscriptions(data.subscribers);

      const newsletter = await this.newsletterService.findOne(data.newsletter);

      if (subscriptions && newsletter) {
        await Promise.all(
          subscriptions.map(async (subscription: ISubscription) => {
            await this.mailService.sendMail(subscription, newsletter);
            await this.newslettersDeliveryService.create({
              user: data.user,
              subscriber: subscription.id,
              newsletter: newsletter.id,
            });
          }),
        );
      }
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }
}
