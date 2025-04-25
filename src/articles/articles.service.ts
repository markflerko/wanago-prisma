import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { ArticlesSearchParamsDto } from 'src/articles/dto/articles-search-params.dto';
import { CreatePostDto } from 'src/post/dto/createPost.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(post: CreatePostDto, user: User) {
    const categories = post.categoryIds?.map((category) => ({
      id: category,
    }));

    return this.prismaService.article.create({
      data: {
        title: post.title,
        content: post.paragraphs.join(', '),
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

  search({
    textSearch,
    upvotesGreaterThan,
    categoryName,
    authorNameToAvoid,
  }: ArticlesSearchParamsDto) {
    const searchInputs: Prisma.ArticleWhereInput[] = [];

    if (authorNameToAvoid) {
      searchInputs.push({
        NOT: {
          author: {
            name: authorNameToAvoid,
          },
        },
      });
    }

    if (categoryName) {
      searchInputs.push({
        categories: {
          some: {
            name: categoryName,
          },
        },
      });
    }

    if (textSearch) {
      searchInputs.push({
        OR: [
          {
            content: {
              contains: textSearch,
              mode: 'insensitive',
            },
          },
          {
            title: {
              contains: textSearch,
              mode: 'insensitive',
            },
          },
        ],
      });
    }

    if (typeof upvotesGreaterThan === 'number') {
      searchInputs.push({
        upvotes: {
          gt: upvotesGreaterThan,
        },
      });
    }

    if (!searchInputs.length) {
      return this.getAll();
    }

    if (searchInputs.length === 1) {
      return this.prismaService.article.findMany({
        where: searchInputs[0],
      });
    }

    return this.prismaService.article.findMany({
      where: {
        AND: searchInputs,
      },
    });
  }

  searchByText(query: string) {
    return this.prismaService.article.findMany({
      where: {
        OR: [
          {
            content: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  getAll() {
    return this.prismaService.article.findMany();
  }
}
