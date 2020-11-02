import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
    // private readonly configService: ConfigService
  ) {}

  sign(payload: any): string {
    return jwt.sign(payload, this.options.privateKey);
    // return jwt.sign(payload, this.configService.get("PRIVATE_KEY"));
  }
}
