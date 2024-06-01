import { INewsletter } from '@interfaces/newsletter.inferce';
import { ISubscription } from '@interfaces/subscription.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(subscription: ISubscription, newsletter: INewsletter) {
    try {
      const urlUnsubscribe = `https://localhost:4200/unsubscribe/${subscription.email}`;
      const unsubscribe = `</br><a href="${urlUnsubscribe}" rel="noopener" style="color:rgb(26,115,232);text-decoration:underline" target="_blank">unsubscribe</a>`;

      await this.mailService.sendMail({
        to: subscription.email,
        from: 'isaacbelmontv@gmail.com',
        subject: newsletter.title,
        html: `${newsletter.content}${unsubscribe}`,
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
