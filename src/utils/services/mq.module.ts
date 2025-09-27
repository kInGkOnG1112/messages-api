import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqService } from './mq.service';
import { RouteKeyExplorer } from './mq.explorer';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), DiscoveryModule],  // 👈 make ConfigService available here
  providers: [MqService, RouteKeyExplorer],
  exports: [MqService],
})
export class MqModule {}
