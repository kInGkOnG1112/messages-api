// mq.explorer.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { MQ_CONSUMER_METADATA } from './mq.decorator';
import { MqModuleConfig, MqService } from './mq.service';

@Injectable()
export class MqExplorer implements OnModuleInit {
  private readonly logger = new Logger(MqExplorer.name);

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly mqService: MqService,
  ) {}

  async onModuleInit() {
    const providers = this.discovery.getProviders();

    for (const wrapper of providers) {
      const { instance } = wrapper;
      if (!instance) continue;

      const prototype = Object.getPrototypeOf(instance);

      this.metadataScanner.scanFromPrototype(
        instance,
        prototype,
        (methodName: string) => {
          const methodRef = instance[methodName];
          const config: MqModuleConfig = this.reflector.get(
            MQ_CONSUMER_METADATA,
            methodRef,
          );

          if (config) {
            this.logger.log(
              `Registering MQ consumer [${config.exchange}:${config.routingKey}] -> ${instance.constructor.name}.${methodName}()`,
            );

            this.mqService.consume(config, async (msg) => {
              var msg = await this.mqService.extractStringMessageOrFile(msg.content, "c:\\temp");
              const payload = JSON.parse(msg.toString());
              await methodRef.call(instance, payload, msg);
              return true;
            });
          }
        },
      );
    }
  }
}
