import { Injectable } from "@nestjs/common";
import { MqConsumer } from "src/utils/services/mq.decorator";
import { TPAY_EXCHANGE, X_TPAY_Q5_CASHINTRANSACTION, X_TPAY_Q6_CASHOUTTRANSACTION } from "src/utils/services/rabbitmq.constants";
import { MqService } from "src/utils/services/rabbitmq.service";

@Injectable()
export class MessageConsumer {
  constructor(
    private readonly mqService: MqService
  ){}

  // @MqConsumer({
  //   exchange: 'CTM',
  //   routingKey: 'machine.activates.R11-OPME271MP20004LC',
  //   queue: 'CTMNonTransaction'
  // })
  // async activateMachine(msg: any){
  //   console.log(msg, 'msge response')
  // }

  @MqConsumer({
    exchange: 'TraxionPay',
    routingKey: 'test.transaction.cashout',
    queue: 'TestTPayCashoutTransaction'
  })
  async cashOutResponse1(msg: any){
    const newMessage = {
      "timestamp": 1750919998271,
      "code": 2010,
      "message": "Fund Transfer transaction processed successfully.",
      "data": [
        {
          "referenceNumber": "PLH8NDJJJA0T",
          "transactionAmount": 10000,
          "transactionFee": 0,
          "purpose": "Fund Transfer",
          "status": 1,
          "recipient": {
            "fullName": "Wendell Tuling Hingosa",
            "accountNumber": "1011367400362895",
            "contactInfo": "+639212148476",
            "personCode": "986675D7-172D-4B9E-969B-8B04128033E9",
            "walletCode": "TP-20250113-114716-293620",
            "mobileNumber": "+639212148476",
            "email": "wendell.hingosa@gmail.com"
          },
          "sender": {
            "fullName": "JUAN EWALLET MARTINEZ",
            "accountNumber": "1011500420390548",
            "contactInfo": "+639760819167",
            "personCode": "611E431E-6394-4E45-995A-062DA27C9738",
            "walletCode": "TP-20250616-104719-060911",
            "mobileNumber": "+639760819167",
            "email": "rsare@traxiontech.net"
          }

        }
      ]
    }

    this.mqService.sendMessage({
      exchange: 'TraxionPay',
      routingKey: 'transaction.cashout.response',
      queue: 'TPayCashoutTransactions'
    }, newMessage)
    // console.log(newMessage)
  }

  @MqConsumer({
    exchange: TPAY_EXCHANGE,
    routingKey: 'transaction.cashout',
    queue: X_TPAY_Q6_CASHOUTTRANSACTION
  })
  async cashOutResponse(msg: any){
    const newMessage = { ...msg, statusCode: 200, message: 'Dispense cash was approved'}
    this.mqService.sendMessage({
      exchange: TPAY_EXCHANGE,
      routingKey: 'transaction.cashout.response',
      queue: X_TPAY_Q6_CASHOUTTRANSACTION
    }, newMessage)
    console.log(newMessage)
  }

  @MqConsumer({
    exchange: TPAY_EXCHANGE,
    routingKey: 'transaction.cashin',
    queue: X_TPAY_Q5_CASHINTRANSACTION
  })
  async cashInResponse(msg: any){
    const newMessage = { ...msg, message: 'Send cash was approved'}
    this.mqService.sendMessage({
      exchange: TPAY_EXCHANGE,
      routingKey: 'transaction.cashin.response',
      queue: X_TPAY_Q5_CASHINTRANSACTION
    }, newMessage)
    console.log(newMessage)
  }
}