import { Injectable } from "@nestjs/common";
import { generateUniqueId, capitalizeString, formatMQResponse } from "src/utils/helpers/helpers";
import { TPAY_TRANSACTION_REQUEST_KEYS } from "src/utils/services/mq.constants";
import { RouteKey } from "src/utils/services/mq.decorator";
import { MqService } from "src/utils/services/mq.service";

@Injectable()
export class MessageTPayConsumer {
  constructor(
    private readonly mqService: MqService
  ){}

  @RouteKey(TPAY_TRANSACTION_REQUEST_KEYS)
  async tpayTransactionPublish(messageData: any, config: any){
    const { msgType } = config
    const keyParts = msgType?.split('.');
    const lastKey = keyParts[keyParts.length - 1];
    const { integratorReferenceNumber } = messageData

    const referenceNumber = generateUniqueId()
    const newMesssage = {
      timestamp: Date.now(),
      code: 2010,
      message: `${capitalizeString(lastKey)} transaction processed/initiated successfully.`,
      data: [
        {
          aggregatorReferenceNumber: "20250926TRXPPHM2XXXB01868743027368",
          integratorReferenceNumber: integratorReferenceNumber,
          referenceNumber: referenceNumber,
          transactionAmount: 400,
          transactionFee: 300,
          purpose: "Fund Transfer",
          status: 0,
          recipient: {
            institution: "GCASH",
            accountName: "Business Name",
            accountNumber: "09265901230"
          },
          sender: {
            accountName: "  ",
            accountNumber: "1011400495001659",
            contactInfo: "+639304983113",
            personCode: "776B1925-C745-4ECB-8D5E-0C8CF2156C15",
            walletCode: "TP-20250220-190500-172610",
            mobileNumber: "+639304983113",
            email: "mj@traxiontech.net"
          }
        }
      ]
    }

    console.log('New message: ', newMesssage)
    console.log('TRANS ', lastKey)
    console.log('headers ', config.properties.headers)

    this.mqService.sendMessage({
      queue: `ctmcore`,
      headers: config.properties.headers
    }, formatMQResponse(`${msgType}.response`, newMesssage))
  }
}