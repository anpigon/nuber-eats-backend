import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.contants';
import { EmailVars, MailModuleInterface } from './mail.interfaces';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleInterface,
  ) {}

  private async sendMail(
    subject: string,
    to: string,
    template: string,
    emailVars: EmailVars,
  ) {
    const data = {
      from: `Nuber Eats from <mailgun@${this.options.domain}>`,
      to,
      subject,
      template,
      'h:X-Mailgun-Variables': JSON.stringify(emailVars),
    };
    try {
      const mg = mailgun({
        apiKey: this.options.apiKey,
        domain: this.options.domain,
      });
      const response = await mg.messages().send(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendMail('Verify Your Email', email, 'verify-email', {
      username: email,
      code,
    });
  }
}
