import { Test } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailService } from './mail.service';

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

  it.todo('sendMail');
});
