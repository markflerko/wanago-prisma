import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateBankAccountDto } from 'src/bank-account/dto/create-bank-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BankAccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ ownerId, balance }: CreateBankAccountDto) {
    try {
      return await this.prismaService.bankAccount.create({
        data: {
          ownerId,
          balance,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientUnknownRequestError &&
        error.message.includes('22003')
      ) {
        throw new BadRequestException('The provided balance is too big');
      }
      throw error;
    }
  }
}
