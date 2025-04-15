import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { ProductService } from 'src/product/product.service';
import { FindOneParams } from 'src/utils/findOneParams';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param() { id }: FindOneParams) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Patch(':id')
  async updateProduct(
    @Param() { id }: FindOneParams,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param() { id }: FindOneParams) {
    return this.productsService.deleteProduct(id);
  }
}
