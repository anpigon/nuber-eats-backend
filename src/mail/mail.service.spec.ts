import { Test } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailService } from './mail.service';
import * as mailgun from 'mailgun-js';

jest.mock('mailgun-js', () => {
  const mMailgun = {
    messages: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  return jest.fn(() => mMailgun);
});

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: CONFIG_OPTIONS,
          useValue: {
            apiKey: 'test-apiKey',
            domain: 'test-domain',
            fromEmail: 'test-fromEmail',
          },
        },
      ],
    }).compile();

    service = module.get(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendVerificationEmail', () => {
    it('should call sendEmail', async () => {
      const sendVerificationEmailArgs = {
        email: 'email',
        code: 'code',
      };
      jest.spyOn(service, 'sendMail').mockImplementation(async () => true);
      await service.sendVerificationEmail(
        sendVerificationEmailArgs.email,
        sendVerificationEmailArgs.code,
      );

      expect(service.sendMail).toHaveBeenCalledTimes(1);
      expect(service.sendMail).toHaveBeenCalledWith(
        'Verify Your Email',
        sendVerificationEmailArgs.email,
        'verify-email',
        {
          code: sendVerificationEmailArgs.code,
          username: sendVerificationEmailArgs.email,
        },
      );
    });
  });

  describe('sendMail', () => {
    it('send email', async () => {
      const ok = await service.sendMail('', '', '', {});

      expect(mailgun).toHaveBeenCalledTimes(1);
      expect(mailgun).toHaveBeenCalledWith({
        apiKey: 'test-apiKey',
        domain: 'test-domain',
      });

      expect(mailgun({} as any).messages).toHaveBeenCalledTimes(1);
      expect(mailgun({} as any).messages().send).toHaveBeenCalledTimes(1);
      expect(mailgun({} as any).messages().send).toBeCalledWith(
        expect.any(Object),
      );
      expect(ok).toBeTruthy();
    });

    it('fails on error', async () => {
      jest.spyOn(mailgun({} as any), 'messages').mockImplementation(() => {
        throw new Error();
      });
      const ok = await service.sendMail('', '', '', {});
      expect(ok).toBeFalsy();
    });
  });
});
