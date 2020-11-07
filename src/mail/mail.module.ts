import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.contants';
import { MailModuleInterface } from './mail.interfaces';

@Module({})
@Global()
export class MailModule {
  static fotRoot(options: MailModuleInterface): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      exports: [],
    };
  }
}
