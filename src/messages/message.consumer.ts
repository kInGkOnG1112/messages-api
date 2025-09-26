import { Injectable } from "@nestjs/common";
import { MqConsumer } from "src/utils/services/mq.decorator";
import { CTM_EXCHANGE, TPAY_EXCHANGE, X_CTM_Q1_NONTRANSACTION, X_CTM_Q6_CASHOUTTRANSACTION, X_TPAY_Q5_CASHINTRANSACTION, X_TPAY_Q6_CASHOUTTRANSACTION } from "src/utils/services/mq.constants";
import { MqService } from "src/utils/services/mq.service";

@Injectable()
export class MessageConsumer {
  constructor(
    private readonly mqService: MqService
  ){}

  @MqConsumer({
    exchange: CTM_EXCHANGE,
    routingKey: 'ctm.machine.activate',
    queue: `R11-OPME271MP20004LC.${X_CTM_Q1_NONTRANSACTION}`
  })
  async activateMachine(msg: any){
    console.log(msg, 'msge response for R11-OPME271MP20004LC')
  }

  @MqConsumer({
    exchange: CTM_EXCHANGE,
    routingKey: 'ctm.machine.activate',
    queue: `R11-OPMD5KFCO10009LC.${X_CTM_Q1_NONTRANSACTION}`
  })
  async activateMachine1(msg: any){
    console.log(msg, 'msge response for R11-OPMD5KFCO10009LC')
  }

  // @MqConsumer({
  //   exchange: CTM_EXCHANGE,
  //   routingKey: 'R11-OPME271MP20004LC.cashOut.response',
  //   queue: `R11-OPME271MP20004LC.Transactional`
  // })
  // async cashOutConsume1(msg: any){
  //   console.log(msg, ' msge response for R11-OPME271MP20004LC')
  // }

  @MqConsumer({
    exchange: CTM_EXCHANGE,
    routingKey: 'R11-OPMD5KFCO10009LC.cashOut.response',
    queue: 'R11-OPMD5KFCO10009LC.Transactional'
  })
  async cashOutConsume(msg: any){
    console.log(msg, ' msge response for R11-OPMD5KFCO10009LC')
  }

  // @MqConsumer({
  //   exchange: 'TraxionPay',
  //   routingKey: 'test.transaction.cashOut',
  //   queue: 'TestTPayCashoutTransaction'
  // })
  // async cashOutResponse(msg: any){
  //   const newMessage = {
  //     "timestamp": 1750919998271,
  //     "code": 2010,
  //     "message": "Fund Transfer transaction processed successfully.",
  //     "data": [
  //       {
  //         "referenceNumber": "PLH8NDJJJA0T",
  //         "transactionAmount": 10000,
  //         "transactionFee": 0,
  //         "purpose": "Fund Transfer",
  //         "status": 1,
  //         "recipient": {
  //           "fullName": "Wendell Tuling Hingosa",
  //           "accountNumber": "1011367400362895",
  //           "contactInfo": "+639212148476",
  //           "personCode": "986675D7-172D-4B9E-969B-8B04128033E9",
  //           "walletCode": "TP-20250113-114716-293620",
  //           "mobileNumber": "+639212148476",
  //           "email": "wendell.hingosa@gmail.com"
  //         },
  //         "sender": {
  //           "fullName": "JUAN EWALLET MARTINEZ",
  //           "accountNumber": "1011500420390548",
  //           "contactInfo": "+639760819167",
  //           "personCode": "611E431E-6394-4E45-995A-062DA27C9738",
  //           "walletCode": "TP-20250616-104719-060911",
  //           "mobileNumber": "+639760819167",
  //           "email": "rsare@traxiontech.net"
  //         }

  //       }
  //     ]
  //   }

  //   this.mqService.sendMessage({
  //     exchange: 'TraxionPay',
  //     routingKey: 'transaction.cashOut.response',
  //     queue: 'TPayCashoutTransactions'
  //   }, newMessage)
  //   // console.log(newMessage)
  // }
}