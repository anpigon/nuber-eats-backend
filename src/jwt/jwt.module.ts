import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Global()
@Module({})
export class JwtModule {
  static forRoot(): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [JwtService],
    };
  }
}
