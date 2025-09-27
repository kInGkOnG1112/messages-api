import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { MqService } from "./mq.service";
import { CTMCORE_BINDINGS } from "./mq.constants";
import { ROUTE_KEY_METADATA } from "./mq.decorator";

@Injectable()
export class RouteKeyExplorer implements OnModuleInit {
  private readonly logger = new Logger(RouteKeyExplorer.name);
  private readonly handlers = new Map<string, Function>();

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
          const routeKeys: string[] = this.reflector.get(
            ROUTE_KEY_METADATA,
            methodRef,
          );

          if (routeKeys?.length) {
            for (const key of routeKeys) {
              this.logger.log(`Registered routeKey [${key}] → ${instance.constructor.name}.${methodName}()`);
              this.handlers.set(key, methodRef.bind(instance));
            }
          }
        },
      );
    }

    for (const config of CTMCORE_BINDINGS){
      await this.mqService.consume(
        config, // bind to all keys
        async (msg) => {
          const { routingKey } = msg.fields;
          const handler = this.handlers.get(routingKey);

          if (handler) {
            const extracted = await this.mqService.extractStringMessageOrFile(msg.content, "c:\\temp");
            const payload = JSON.parse(msg.content.toString());
            const { terminalId } = msg.properties?.headers
            await handler(payload, terminalId, msg);
            return true;
          }

          this.logger.warn(`No handler found for routingKey: ${routingKey}`);
          return false;
        }
      );
    }
  }
}
