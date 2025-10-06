import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  terminalId: string;

  @ApiProperty({ maxLength: 150 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  serialNumber: string;
}

export class GenericMessageDto {
  
  @ApiProperty({ maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  msgType: string;

  
}