import { Injectable } from "@nestjs/common";
import { TPAY_TRANSACTION_REQUEST_KEYS } from "src/utils/services/mq.constants";
import { RouteKey } from "src/utils/services/mq.decorator";
import { MqService } from "src/utils/services/mq.service";

@Injectable()
export class MessageTPayConsumer {
  constructor(
    private readonly mqService: MqService
  ){}

  @RouteKey(TPAY_TRANSACTION_REQUEST_KEYS)
  async tpayTransactionPublish(message: any, terminalId: string, config: any){
    const keyParts = config.fields.routingKey?.split('.');
    const lastKey = keyParts[keyParts.length - 1];
    console.log('TPay Transaction Received (', lastKey,'): ', message)
    console.log('Headers: ', config.properties.headers)

    this.mqService.sendMessage({
      exchange: 'ctmcore',
      routingKey: `ctmcore.transac.response.${lastKey}`,
      queue: `ctmcore.transac.${lastKey}`,
      headers: config.properties.headers
    }, message)
  }
}