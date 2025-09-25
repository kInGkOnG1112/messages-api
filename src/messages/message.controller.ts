import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientProxy, EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { MqModuleConfig, MqService } from 'src/utils/services/rabbitmq.service';
import { MqConsumer } from 'src/utils/services/mq.decorator';
import { SendCashoutDto } from './dtos/send-cashout.dto';
import { TransactionDto, TransactionPaylodDto } from './dtos/transaction.dto';

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
    this.mqService.sendMessage({
      exchange: 'CTMCore',
      routingKey: 'machine.activates',
      queue: 'CTMCoreNonTransaction'
    }, requestData);
    console.log("Machine Activation Sent to CTM API MQ: ", requestData);
    console.log("==================================================================");

    return { 
      message: 'Message sent!',
      data: requestData
    };
  }

  @Post('/cashout')
  @ApiOperation({ summary: 'Send sample data to MQ' })
  sendCashout(@Body() requestData: TransactionPaylodDto) {
    console.log("===================== Machine Emit Transaction =====================");
    this.mqService.sendMessage({
      exchange: 'CTMCore',
      routingKey: 'test.transaction.cashouts',
      queue: 'TestCTMCoreCashoutTransaction'
    }, requestData);
    console.log("Machine Transaction Sent to CTM API MQ: ", requestData);
    console.log("==================================================================");

    return { 
      message: 'Message sent!',
      data: requestData
    };
  }
}
