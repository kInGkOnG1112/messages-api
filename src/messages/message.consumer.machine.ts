import { Injectable } from "@nestjs/common";
import { MqConsumer } from "src/utils/services/mq.decorator";
import { MqService } from "src/utils/services/mq.service";
import { 
  TPAY_EXCHANGE, 
  X_TPAY_Q5_CASHINTRANSACTION, 
  X_TPAY_Q6_CASHOUTTRANSACTION 
} from "src/utils/services/mq.constants";

@Injectable()
export class MessageMachineConsumer {
  constructor(
    private readonly mqService: MqService
  ){}

//   @MqConsumer({
//     exchange: TPAY_EXCHANGE,
//     routingKey: 'transaction.request.cashOut',
//     queue: X_TPAY_Q6_CASHOUTTRANSACTION
//   })
//   async cashOutResponse(msg: any){
//     const newMessage = { 
//       ...msg, 
//       statusCode: 200, 
//       message: 'Dispense cash was approved'
//     }

//     this.mqService.sendMessage({
//       exchange: TPAY_EXCHANGE,
//       routingKey: 'transaction.cashOut.response',
//       queue: X_TPAY_Q6_CASHOUTTRANSACTION
//     }, newMessage)
//   }

//   @MqConsumer({
//     exchange: TPAY_EXCHANGE,
//     routingKey: 'transaction.request.cashin',
//     queue: X_TPAY_Q5_CASHINTRANSACTION
//   })
//   async cashInResponse(msg: any){
//     const newMessage = { 
//       ...msg,
//       statusCode: 200, 
//       message: 'Send cash was approved'
//     }

//     this.mqService.sendMessage({
//       exchange: TPAY_EXCHANGE,
//       routingKey: 'transaction.cashin.response',
//       queue: X_TPAY_Q5_CASHINTRANSACTION
//     }, newMessage)
//   }
}