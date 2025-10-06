import { Injectable } from "@nestjs/common";
import { RouteKey } from "src/utils/services/mq.decorator";

@Injectable()
export class MessageMachineConsumer {
  
  @RouteKey([`machine.activate.response`])
  async activateMachine(message: any){
    console.log(message)
  }
  
  @RouteKey([
    'transac.cashin.response',
    'transac.cashout.response',
    'transac.sendmoney.response',
    'transac.paybills.response',
    'transac.inquery.response',
  ])
  async machineTransactionResponse(message: any, config: any){
    const { terminalId, msgType } = config
    const newMessage = { 
      ...message, 
      statusCode: 200, 
      message: `Machine[${terminalId}] Received transaction response of ${msgType}`
    }
    console.log(newMessage)
  }
}