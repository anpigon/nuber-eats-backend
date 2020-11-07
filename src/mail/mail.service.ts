import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.contants';
import { MailModuleInterface } from './mail.interfaces';
import got from 'got';
import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleInterface,
  ) {}

  private async sendMail(subject: string, content: string, to: string) {
    try {
      const form = new FormData();
      form.append('from', `Excited User <${this.options.domain}>`);
      form.append('to', to);
      form.append('subject', subject);
      form.append('text', content);
      const response = await got(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
      console.log(response.body);
    } catch (error) {
      console.error(error);
    }
  }
}
