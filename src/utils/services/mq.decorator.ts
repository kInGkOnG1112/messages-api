// mq.decorators.ts
import { SetMetadata } from '@nestjs/common';

export const MQ_CONSUMER_METADATA = 'MQ_CONSUMER_METADATA';

export interface MqConsumerOptions {
  exchange: string;
  queue: string;
  routingKey: string;
}

export const MqConsumer = (options: MqConsumerOptions) =>
  SetMetadata(MQ_CONSUMER_METADATA, options);
