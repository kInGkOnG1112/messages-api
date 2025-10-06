import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MqService } from 'src/utils/services/mq.service';
import { formatMQResponse } from 'src/utils/helpers/helpers';

@ApiTags('Machine')
@Controller('machine')
export class MessagesController {
  constructor(
    private readonly mqService: MqService
  ){}

  @Post()
  @ApiOperation({ summary: 'Send sample data to MQ' })
  sendMessage(@Body() requestData: any) {
    this.mqService.sendMessage({
      queue: 'ctmcore',
      headers: { terminalId: process.env.MACHINE_TERMINAL_ID }
    }, requestData);
    return { 
      message: 'Machine activation message sent!',
      data: requestData
    };
  }

  @Post('transaction/cashout')
  @ApiOperation({ summary: 'Send sample data to MQ' })
  cashOut(@Body() requestData: any) {
    this.mqService.sendMessage({
      queue: 'ctmcore',
      headers: { terminalId: process.env.MACHINE_TERMINAL_ID }
    }, formatMQResponse('transac.cashout', requestData));
    
    return { 
      message: 'Machine transaction cashout message sent!',
      data: requestData
    };
  }

  @Post('transaction/cashin')
  @ApiOperation({ summary: 'Send sample data to MQ' })
  cashIn(@Body() requestData: any) {
    this.mqService.sendMessage({
      queue: 'ctmcore',
      headers: { terminalId: process.env.MACHINE_TERMINAL_ID }
    }, formatMQResponse('transac.cashin', requestData));

    return { 
      message: 'Machine transaction cashin message sent!',
      data: requestData
    };
  }

  @Post('transaction/send-money')
  @ApiOperation({ summary: 'Send sample send money data to MQ' })
  sendMoney(@Body() requestData: any) {
    this.mqService.sendMessage({
      queue: 'ctmcore',
      headers: { terminalId: process.env.MACHINE_TERMINAL_ID }
    }, formatMQResponse('transac.sendmoney', requestData));

    return { 
      message: 'Machine transaction send-money message sent!',
      data: requestData
    };
  }
}
