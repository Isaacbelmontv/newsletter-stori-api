import { INewsletter } from '@interfaces/newsletter.inferce';
import { ISubscription } from '@interfaces/subscription.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(subscription: ISubscription, newsletter: INewsletter) {
    try {
      await this.mailService.sendMail({
        to: subscription.email,
        from: 'isaacbelmontv@gmail.com',
        subject: newsletter.title,
        text: newsletter.content,
        attachments: [
          {
            filename: newsletter.assetname,
            content: newsletter.assetfile,
            encoding: newsletter.assettype,
          },
        ],
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
