import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAddress() {
    const countriesWithFirstUser = await this.prismaService.address.findMany({
      include: {
        user: true,
      },
      distinct: ['country'],
      orderBy: {
        user: {
          id: 'asc',
        },
      },
    });

    return countriesWithFirstUser;
  }
}
