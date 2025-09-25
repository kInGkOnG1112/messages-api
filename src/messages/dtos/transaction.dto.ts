import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsObject,
  isObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested
} from "class-validator";

export class RecipientDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  account: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  institutionId: number;
}

export class SenderDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  account: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  institutionId: number;
}

export class AmountDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  currency: string = 'PHP';

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  value: number;
}

export class TransactionFeeBreakdownDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  operatorFee: number = 0;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  licenseFee: number = 0;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  networkFee: number = 0;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  operatorAddOnFee: number = 0;
}

export class TransactionFeeDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Min(0)
  total: number = 0;

  @ApiPropertyOptional()
  @IsOptional()
  auth: TransactionFeeBreakdownDto;
}

export class TransactionDetailsDto {
  @ApiProperty()
  @IsDefined()
  recipient: RecipientDto;

  @ApiProperty()
  @IsDefined()
  sender: SenderDto;

  @ApiProperty()
  @IsDefined()
  amount: AmountDto;

  @ApiProperty()
  @IsDefined()
  transactionFee: TransactionFeeDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn([1, 2, 3, 4, 5, 9], {
    message:
      'Allowed values 1: Wallet Balance, 2: Online Bank Transfer,' +
      '3. Credit Card, 4. Cash, 5. Cheque, 9. Others',
  })
  tenderId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  inquiryRefNo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  productCode: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  topupUserID: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  serverID: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  character: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  topupAccountNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brandName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  brandId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  institutionId: number;

  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, string>;
}

export class TransactionAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  otpCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsNumber()
  otpType: number;
}

export class QRTransactionDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class TransactionDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  transactionCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  integratorReferenceNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  qr: QRTransactionDto;

  @ApiProperty({ type: [TransactionDetailsDto] })
  @IsDefined()
  @IsArray()
  details: TransactionDetailsDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  auth: TransactionAuthDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notificationUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  otherDetails: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  reversal: boolean = false;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  transactionReferenceNumber: string;
}

export class CallbackReceiverDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  txnid: string;
}

export class TransactionPaylodDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  terminalId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  traceReferenceNumber: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  ctmTransactionCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  tpayPayload: TransactionDto;

}
