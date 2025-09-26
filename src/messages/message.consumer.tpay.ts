import { Injectable } from "@nestjs/common";
import { MqConsumer } from "src/utils/services/mq.decorator";
import { MqService } from "src/utils/services/mq.service";
import { 
  CTM_EXCHANGE,
  CTMCORE_EXCHANGE,
  TPAY_EXCHANGE, 
  X_CTMCORE_Q5_CASHINTRANSACTION, 
  X_CTMCORE_Q6_CASHOUTTRANSACTION, 
  X_CTMCORE_Q7_SENDMONEYTRANSACTION, 
  X_TPAY_Q5_CASHINTRANSACTION, 
  X_TPAY_Q6_CASHOUTTRANSACTION, 
  X_TPAY_Q7_SENDMONEYTRANSACTION
} from "src/utils/services/mq.constants";

@Injectable()
export class MessageTPayConsumer {
  constructor(
    private readonly mqService: MqService
  ){}

  @MqConsumer({
    exchange: TPAY_EXCHANGE,
    routingKey: 'tpay.cashOut.request',
    queue: X_TPAY_Q6_CASHOUTTRANSACTION
  })
  async cashOutResponse(msg: any){
    const newMessage = {
      terminalId: msg.terminalId,
      timestamp: 1750919998271,
      code: 2010,
      message: "Fund Transfer transaction processed successfully.",
      data: [
        {
          referenceNumber: "PLH8NDJJJA0T",
          transactionAmount: 10000,
          transactionFee: 0,
          purpose: "Fund Transfer",
          status: 1,
          recipient: {
            fullName: "Wendell Tuling Hingosa",
            accountNumber: "1011367400362895",
            contactInfo: "+639212148476",
            personCode: "986675D7-172D-4B9E-969B-8B04128033E9",
            walletCode: "TP-20250113-114716-293620",
            mobileNumber: "+639212148476",
            email: "wendell.hingosa@gmail.com"
          },
          sender: {
            fullName: "JUAN EWALLET MARTINEZ",
            accountNumber: "1011500420390548",
            contactInfo: "+639760819167",
            personCode: "611E431E-6394-4E45-995A-062DA27C9738",
            walletCode: "TP-20250616-104719-060911",
            mobileNumber: "+639760819167",
            email: "rsare@traxiontech.net"
          }

        }
      ]
    }
    console.log(newMessage, ' response')
    this.mqService.sendMessage({
      exchange: CTMCORE_EXCHANGE,
      routingKey: 'ctmCore.cashOut.response',
      queue: X_CTMCORE_Q6_CASHOUTTRANSACTION
    }, newMessage)
  }

  @MqConsumer({
    exchange: TPAY_EXCHANGE,
    routingKey: 'tpay.cashin.request',
    queue: X_TPAY_Q5_CASHINTRANSACTION
  })
  async cashInResponse(msg: any){
    this.mqService.sendMessage({
      exchange: CTMCORE_EXCHANGE,
      routingKey: 'ctmCore.cashin.response',
      queue: X_CTMCORE_Q5_CASHINTRANSACTION
    }, msg)
  }

  @MqConsumer({
    exchange: TPAY_EXCHANGE,
    routingKey: 'tpay.sendMoney.request',
    queue: X_TPAY_Q7_SENDMONEYTRANSACTION
  })
  async sendMoneyResponse(msg: any){
    this.mqService.sendMessage({
      exchange: CTM_EXCHANGE,
      routingKey: 'ctmCore.sendMoney.response',
      queue: X_CTMCORE_Q7_SENDMONEYTRANSACTION
    }, msg)
  }
}