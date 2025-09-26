import { Module } from '@nestjs/common';
import { MessagesController } from './message.controller';
import { MqModule } from 'src/utils/services/mq.module';
import { MessageConsumer } from './message.consumer';
import { MessageTPayConsumer } from './message.consumer.tpay';
import { MessageMachineConsumer } from './message.consumer.machine';

@Module({
  imports: [
    MqModule
  ],
  controllers: [MessagesController],
  providers: [
    MessageConsumer, 
    MessageTPayConsumer,
    MessageMachineConsumer
  ]
})
export class MessagesModule {}
