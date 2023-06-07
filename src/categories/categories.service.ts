import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PostsService } from 'src/post/posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaError } from '../utils/prismaError';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';
import CategoryNotFoundException from './exceptions/categoryNotFound.exception';

@Injectable()
export default class CategoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postsService: PostsService,
  ) {}

  async deleteCategoryWithPosts(id: number) {
    const category = await this.getCategoryById(id);

    const postIds = category.posts.map((post) => post.id);

    return this.prismaService.$transaction([
      this.postsService.deleteMultiplePosts(postIds),
      this.deleteCategoryById(id),
    ]);
  }

  deleteCategoryById(id: number) {
    return this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }

  getAllCategories() {
    return this.prismaService.category.findMany();
  }

  async getCategoryById(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
    if (!category) {
      throw new CategoryNotFoundException(id);
    }
    return category;
  }

  async createCategory(category: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: category,
    });
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    try {
      return await this.prismaService.category.update({
        data: {
          ...category,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new CategoryNotFoundException(id);
      }
      throw error;
    }
  }

  async deleteCategory(id: number) {
    try {
      return this.prismaService.category.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new CategoryNotFoundException(id);
      }
      throw error;
    }
  }
}
