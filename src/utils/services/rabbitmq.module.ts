import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqService } from './rabbitmq.service';
import { MqExplorer } from './mq.explorer';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), DiscoveryModule],  // 👈 make ConfigService available here
  providers: [MqService, MqExplorer],
  exports: [MqService],
})
export class MqModule {}
