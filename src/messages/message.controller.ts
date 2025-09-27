import { Body, Controller, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MqService } from 'src/utils/services/mq.service';
import { TransactionPaylodDto } from './dtos/transaction.dto';
import { CTMCORE_EXCHANGE } from 'src/utils/services/mq.constants';

@ApiTags('Machine')
@Controller('machine')
export class MessagesController {
  constructor(
    private readonly mqService: MqService
    // @Inject(TRANSACTION_CLIENT)
    // private readonly transactionRMQClient: ClientProxy
  ){}

  @Post()
  @ApiOperation({ summary: 'Send sample data to MQ' })
  sendMessage(@Body() requestData: CreateMessageDto) {
    console.log("===================== Machine Emit Transaction =====================");
    // this.mqService.sendMessage({
    //   exchange: CTMCORE_EXCHANGE,
    //   routingKey: 'ctmCore.machine.activate',
    //   queue: `Test${X_CTMCORE_Q1_NONTRANSACTION}`
    // }, requestData);
    this.mqService.sendMessage({
      // exchange: 'ctmcore',
      // routingKey: 'ctmcore.transac.request.cashin',
      // queue: 'ctmcore.transac.cashin',
      // headers: { terminalId: requestData.terminalId }

      exchange: 'ctmcore.nontransac',
      routingKey: 'ctmcore.machine.activate',
      queue: 'ctmcore.nontransac',
      headers: { terminalId: requestData.terminalId }
    }, requestData);
    console.log("Machine Activation Sent to CTM API MQ: ", requestData);
    console.log("==================================================================");

    return { 
      message: 'Message sent!',
      data: requestData
    };
  }

  @Post('/cashOut')
  @ApiOperation({ summary: 'Send sample data to MQ' })
  cashOut(@Body() requestData: TransactionPaylodDto) {
    console.log("===================== Machine Emit Transaction =====================");
    this.mqService.sendMessage({
      exchange: CTMCORE_EXCHANGE,
      routingKey: 'ctmCore.cashOut.request',
      queue: 'X_CTMCORE_Q6_CASHOUTTRANSACTION',
      headers: { terminalId: requestData.terminalId }
    }, requestData);
    console.log("Machine Cash Out Sent to CTM API MQ: ", requestData);
    console.log("==================================================================");

    return { 
      message: 'Message sent!',
      data: requestData
    };
  }

  @Post('/cashin')
  @ApiOperation({ summary: 'Send sample data to MQ' })
  cashIn(@Body() requestData: TransactionPaylodDto) {
    console.log("===================== Machine Emit Transaction =====================");
    this.mqService.sendMessage({
      exchange: 'CTMCore',
      routingKey: 'ctmCore.cashin',
      queue: 'CTMCoreCashinTransaction'
    }, requestData);
    console.log("Machine Transaction Sent to CTM API MQ: ", requestData);
    console.log("==================================================================");

    return { 
      message: 'Message sent!',
      data: requestData
    };
  }

  @Post('/send-money')
  @ApiOperation({ summary: 'Send sample send money data to MQ' })
  sendMoney(@Body() requestData: TransactionPaylodDto) {
    console.log("===================== Machine Emit Transaction =====================");
    this.mqService.sendMessage({
      exchange: 'CTMCore',
      routingKey: 'ctmCore.sendMoney',
      queue: 'CTMCoreSendMoneyTransaction'
    }, requestData);
    console.log("Machine Send Money Sent to CTM API MQ: ", requestData);
    console.log("==================================================================");

    return { 
      message: 'Message sent!',
      data: requestData
    };
  }
}
