import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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
    const category = await this.getById(id);

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

  private includeNestedCategories(
    maximumLevel: number,
  ): boolean | Prisma.Category$nestedCategoriesArgs {
    if (maximumLevel === 1) {
      return true;
    }
    return {
      include: {
        nestedCategories: this.includeNestedCategories(maximumLevel - 1),
      },
    };
  }

  async getById(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
        nestedCategories: this.includeNestedCategories(10),
      },
    });
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async create(category: CreateCategoryDto) {
    const nestedCategories =
      category.nestedCategoryIds?.map((id) => ({
        id,
      })) || [];
    try {
      return await this.prismaService.category.create({
        data: {
          name: category.name,
          nestedCategories: {
            connect: nestedCategories,
          },
        },
        include: {
          nestedCategories: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.ConnectedRecordsNotFound
      ) {
        throw new ConflictException(
          'Some of the provided category ids are not valid',
        );
      }
      throw error;
    }
  }

  async update(id: number, category: UpdateCategoryDto) {
    try {
      const nestedCategories =
        category.nestedCategoryIds?.map((id) => ({
          id,
        })) || [];
      return await this.prismaService.category.update({
        data: {
          name: category.name,
          nestedCategories: {
            connect: nestedCategories,
          },
        },
        include: {
          nestedCategories: true,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
        throw error;
      }
      if (error.code === PrismaError.RecordDoesNotExist) {
        throw new NotFoundException();
      }
      if (error.code === PrismaError.ConnectedRecordsNotFound) {
        throw new ConflictException(
          'Some of the provided category ids are not valid',
        );
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
