import { BankAccount } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

type BankAccountType = Omit<BankAccount, 'id'>;

export class CreateBankAccountDto implements BankAccountType {
  balance: Decimal;
  ownerId: number;
}
