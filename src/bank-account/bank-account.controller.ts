import { Body, Controller, Post } from '@nestjs/common';
import { BankAccountService } from 'src/bank-account/bank-account.service';
import { CreateBankAccountDto } from 'src/bank-account/dto/create-bank-account.dto';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  create(@Body() dto: CreateBankAccountDto) {
    return this.bankAccountService.create(dto);
  }
}
