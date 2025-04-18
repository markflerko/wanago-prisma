import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreatePostDto } from 'src/post/dto/createPost.dto';
import { PaginationParamsDto } from 'src/post/dto/paginationParams.dto';
import { ReplacePostDto } from 'src/post/dto/replacePost.dto';
import { UpdatePostDto } from 'src/post/dto/updatePost.dto';
import { PostNotFoundException } from 'src/post/posts.exception';
import { PrismaError } from 'src/utils/prismaError';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getPosts({ limit, offset, startingId }: PaginationParamsDto) {
    this.logger.verbose('Get all posts');

    const [count, items] = await this.prismaService.$transaction([
      this.prismaService.post.count(),
      this.prismaService.post.findMany({
        take: limit,
        skip: offset,
        cursor: {
          id: startingId ?? 1,
        },
      }),
    ]);

    return {
      count,
      items,
    };
  }

  // async getPosts(offset?: number, limit?: number) {
  //   const [count, items] = await this.prismaService.$transaction([
  //     this.prismaService.post.count(),
  //     this.prismaService.post.findMany({
  //       take: limit,
  //       skip: offset,
  //     }),
  //   ]);

  //   return {
  //     count,
  //     items,
  //   };
  // }

  async getPostsByAuthor(authorId: number, offset?: number, limit?: number) {
    this.logger.verbose('Get all posts');

    const [count, items] = await this.prismaService.$transaction([
      this.prismaService.post.count({
        where: {
          authorId,
        },
      }),
      this.prismaService.post.findMany({
        take: limit,
        skip: offset,
        where: {
          authorId,
        },
      }),
    ]);

    return {
      count,
      items,
    };
  }

  deleteMultiplePosts(ids: number[]) {
    return this.prismaService.post.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async deletePost(id: number) {
    try {
      return this.prismaService.post.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }

  async replacePost(id: number, post: ReplacePostDto) {
    try {
      return await this.prismaService.post.update({
        data: {
          ...post,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }

  async updatePost(id: number, post: UpdatePostDto) {
    try {
      return await this.prismaService.post.update({
        data: {
          ...post,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }

  async createPost(post: CreatePostDto, user: User) {
    const categories = post.categoryIds?.map((category) => ({
      id: category,
    }));

    return this.prismaService.post.create({
      data: {
        title: post.title,
        paragraphs: post.paragraphs,
        scheduledDate: post.scheduledDate,
        createdAt: new Date(),
        author: {
          connect: {
            id: user.id,
          },
        },
        categories: {
          connect: categories,
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async getPostById(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return post;
  }
}
