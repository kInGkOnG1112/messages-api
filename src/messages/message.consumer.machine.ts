import { Injectable } from "@nestjs/common";
import { RouteKey } from "src/utils/services/mq.decorator";
import { MqService } from "src/utils/services/mq.service";
import { 
  TPAY_EXCHANGE, 
} from "src/utils/services/mq.constants";

const terminalId1 = 'R11-OPMD5KFCO10009LC'
const terminalId2 = 'R11-OPME271MP20004LC'
const tranType = 'cashout'

@Injectable()
export class MessageMachineConsumer {
  constructor(
    private readonly mqService: MqService
  ){}

  
  @RouteKey([`${terminalId2}.ctm.machine.activate`])
  async cashOutResponse1(msg: any, config: any){
    console.log(config)
    const newMessage = { 
      ...msg, 
      statusCode: 200, 
      message: 'Cash out Dispense cash was approved 1'
    }
    console.log(newMessage)
  }
  
  @RouteKey([
    `${terminalId1}.ctm.transac.response.cashin`,
    `${terminalId1}.ctm.transac.response.cashout`,
    `${terminalId1}.ctm.transac.response.sendmoney`,
    `${terminalId1}.ctm.transac.response.paybills`,
    `${terminalId1}.ctm.transac.response.inquery`,
  ])
  async machineTransactionResponse1(
    msg: any, 
    terminalId: string, 
    config: any
  ){
    const keyParts = config.fields.routingKey?.split('.');
    const lastKey = keyParts[keyParts.length - 1];
    console.log(config)
    const newMessage = { 
      ...msg, 
      statusCode: 200, 
      message: `Machine[${terminalId1}] 1 Received transaction response of ${lastKey}`
    }
    console.log(newMessage)
  }
  
  @RouteKey([
    `${terminalId2}.ctm.transac.response.cashin`,
    `${terminalId2}.ctm.transac.response.cashout`,
    `${terminalId2}.ctm.transac.response.sendmoney`,
    `${terminalId2}.ctm.transac.response.paybills`,
    `${terminalId2}.ctm.transac.response.inquery`,
  ])
  async machineTransactionResponse2(
    msg: any, 
    terminalId: string, 
    config: any
  ){
    const keyParts = config.fields.routingKey?.split('.');
    const lastKey = keyParts[keyParts.length - 1];
    console.log(config)
    const newMessage = { 
      ...msg, 
      statusCode: 200, 
      message: `Machine[${terminalId2}] 2 Received transaction response of ${lastKey}`
    }
    console.log(newMessage)
  }
}