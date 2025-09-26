import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { config } from 'process';
import * as fs from 'fs';
import { MQ_EXPIRES, MQ_TTL } from './mq.constants';

export interface MqModuleConfig {
  exchange: string;
  queue: string;
  routingKey: string;
}

@Injectable()
export class MqService implements OnModuleDestroy {
  private readonly logger = new Logger(MqService.name);
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private readonly configService: ConfigService) {}

  async init(): Promise<void> {
    if (this.connection) return;

    const url = process.env.RABBITMQ_URL
    this.logger.log(`Connecting to MQ: ${url}`);

    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();

    this.logger.log('RabbitMQ connected and channel created.');
  }

  async sendMessage(module: MqModuleConfig, message: any): Promise<void> {
    await this.init();
    await this.channel.assertExchange(module.exchange, 'topic', {
      durable: true,
      arguments: { 
        'x-message-ttl': MQ_TTL, 
        'x-expires': MQ_EXPIRES 
      },
    });
    await this.channel.assertQueue(module.queue, {
      exclusive: false,
      durable: true,
      arguments: { 
        'x-message-ttl': MQ_TTL, 
        'x-expires': MQ_EXPIRES 
      },
    });
    await this.channel.bindQueue(
      module.queue, 
      module.exchange, 
      module.routingKey
    );

    const published = this.channel.publish(
      module.exchange,
      module.routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true },
    );

    if (published) {
      this.logger.log(
      `✅ Message sent to [${module.exchange}] with key [${module.routingKey}]`,
      );
    } else {
      this.logger.warn(
      `⚠️ Message not sent (broker returned false) for [${module.exchange}] with key [${module.routingKey}]`,
      );
    }
  }

  async consume(
    module: MqModuleConfig,
    callback: (msg: amqp.ConsumeMessage) => Promise<boolean>,
  ): Promise<void> {
    await this.init();

    await this.channel.assertExchange(module.exchange, 'topic', { durable: true,
      arguments: { 'x-message-ttl': MQ_TTL, 'x-expires': MQ_EXPIRES }, });
    await this.channel.assertQueue(module.queue, { durable: true,
      arguments: { 'x-message-ttl': MQ_TTL, 'x-expires': MQ_EXPIRES }, });
    await this.channel.bindQueue(module.queue, module.exchange, module.routingKey);

    this.channel.consume(
      module.queue,
      async (msg) => {
        if (!msg) return;

        try {
          const ok = await callback(msg);
          ok ? this.channel.ack(msg) : this.channel.nack(msg);
        } catch (err) {
          this.logger.error('Error processing message', err.stack);
          this.channel.nack(msg);
        }
      },
      { noAck: false },
    );

    console.log(`Consumer started on exchange [${module.exchange}] queue [${module.queue}]`)
    this.logger.log(
      `Consumer started on exchange [${module.exchange}] queue [${module.queue}]`,
    );
  }

  async onModuleDestroy() {
    this.logger.log('Closing MQ connection...');
    await this.channel?.close();
    await this.connection?.close();
  }

  async handleHealthMsg(data: any): Promise<boolean> {
    if (data) {
        var msg = this.extractStringMessageOrFile(data.content, "c:\\temp");
        console.log("\n\rReceived data:\n\r", data.fields.exchange, ": ", data.fields.routingKey.toString(), ": \n\rmsg: ", msg);
        console.log("\n\ror if file, chk:\n\r", "c:\\temp\\", msg);
        
        // const app = await NestFactory.createApplicationContext(AppModule);
        // const els = app.get(EventLogService);
        // els.SaveLog({
        //   logLevel: 'INFO',
        //   requestType: 'MQ_RECEIVE',
        //   payload: msg,
        //   response: 'Message processed Heartbeat',
        //   message: `Received MQ message from ${data.fields.exchange}, ${data.fields.queue} with routing key ${data.fields.routingKey.toString()}`,
        //   context: 'mqService',
        //   endpointPath: '',
        //   terminalId: data.fields.routingKey
        // });
        return true;
    } else {
        console.error("Error: null data received");
        return false;
    }
  }

  async extractStringMessageOrFile(
    data: any, 
    defaultPath: string = "c:\\temp"
  ){
    if (data !== null && data[0] !== 0x0) {
      const message = new TextDecoder("utf-8").decode(data);
      return message;
    } else if (data !== null && data[0] === 0x0) {
      const message = this.extractFilenameAndDataOrMsg(data, defaultPath);
      return message;
    }
  }

  async extractFilenameAndDataOrMsg(
    data: any, 
    pathToSave: string
  ){
    let filenameOrMsg;
    let startOfFile = 0;

    try {
        if (!pathToSave) {
          pathToSave = process.cwd();
        }
        if (data && data[0] === 0x0 && fs.existsSync(pathToSave)) {
          let sb = '';
          for (let i = 1; i < data.length; i++) {
              if (data[i] === 0x0) {
                  startOfFile = i + 1;
                  filenameOrMsg = sb;
                  break;
              }
              sb += String.fromCharCode(data[i]);
          }

          const destStream = fs.createWriteStream((pathToSave + "\\" + filenameOrMsg), { flags: 'a' });
          destStream.write(Buffer.from(data.slice(startOfFile)));
          destStream.end();
        } else if (data && data[0] !== 0x0) {
            filenameOrMsg = await this.extractStringMessageOrFile(data);
        }
    } catch (error) {
    }
    return filenameOrMsg;
  }
}
