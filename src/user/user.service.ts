import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserNotFoundException } from 'src/user/user-not-found.exception';
import { PrismaError } from 'src/utils/prismaError';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async delete(userId: number) {
    try {
      return await this.prismaService.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
        throw error;
      }
      if (error.code === PrismaError.RecordDoesNotExist) {
        throw new NotFoundException();
      }
      const affectedField = error.meta?.field_name;
      if (
        error.code === PrismaError.ForeignKeyConstraintViolated &&
        typeof affectedField === 'string' &&
        affectedField.toLowerCase().includes('article')
      ) {
        throw new ConflictException(
          "Can't remove the user that is an author of some articles",
        );
      }
      throw error;
    }
  }

  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async getById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async create(user: CreateUserDto) {
    const address = user.address;
    return this.prismaService.user.create({
      data: {
        ...user,
        address: {
          create: address,
        },
      },
      include: {
        address: true,
      },
    });
  }
}
