import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaError } from '../utils/prismaError';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProductById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  getAllProducts() {
    return this.prismaService.product.findMany({
      where: {
        properties: {
          path: ['publicationYear'],
          lt: 2000,
        },
      },
    });
  }

  async createProduct(product: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: product,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientUnknownRequestError &&
        error.message.includes('check constraint')
      ) {
        throw new BadRequestException(`Price greater than 0`);
      }
      throw error;
    }
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    try {
      return await this.prismaService.product.update({
        data: {
          ...product,
          id: undefined,
          properties: product.properties ?? Prisma.DbNull,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientUnknownRequestError &&
        error.name === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  async deleteProduct(id: number) {
    try {
      return await this.prismaService.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientUnknownRequestError &&
        error.message === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }
}
