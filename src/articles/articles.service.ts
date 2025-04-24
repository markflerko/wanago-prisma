import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ArticlesSearchParamsDto } from 'src/articles/dto/articles-search-params.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

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
