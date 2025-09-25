import { Module } from '@nestjs/common';
import { MessagesController } from './message.controller';
import { MqModule } from 'src/utils/services/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { MessageConsumer } from './message.consumer';
import { MessageTPayConsumer } from './message.consumer.tpay';

@Module({
  imports: [
    MqModule
  ],
  controllers: [MessagesController],
  providers: [
    MessageConsumer, 
    MessageTPayConsumer
  ]
})
export class MessagesModule {}
