import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.contants';
import { MailModuleInterface } from './mail.interfaces';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleInterface,
  ) {}

  private async sendMail(subject: string, template: string, to: string) {
    const mg = mailgun({
      apiKey: this.options.apiKey,
      domain: this.options.domain,
    });
    const data = {
      from: `Excited User <mailgun@${this.options.domain}>`,
      to,
      subject,
      template,
      'v:code': 'code',
      'v:username': 'username',
    };
    const response = await mg.messages().send(data);
    console.log(response);
  }
}
