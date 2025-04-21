import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isRecord } from 'src/utils/is-record';

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAuthorsStatistics() {
    const results = await this.prismaService.article.groupBy({
      by: ['authorId'],
      _sum: {
        upvotes: true,
      },
      _avg: {
        upvotes: true,
      },
      _max: {
        upvotes: true,
      },
      orderBy: {
        _sum: {
          upvotes: 'desc',
        },
      },
      having: {
        upvotes: {
          _avg: {
            gt: 10,
          },
        },
      },
    });

    return results.map(({ authorId, _sum, _max, _avg }) => {
      return {
        authorId,
        allUpvotesReceived: _sum.upvotes,
        averageUpvotesCount: _avg.upvotes,
        biggestUpvotesCount: _max.upvotes,
      };
    });
  }

  private async getArticlesLength() {
    const rawResults = await this.prismaService.$queryRaw`
      SELECT
      max(length(content)) AS longest_article_length,
      min(length(content)) AS shortest_article_length
      FROM "Article"
    `;
    if (!Array.isArray(rawResults)) {
      throw new InternalServerErrorException();
    }
    const result = rawResults[0];
    if (!isRecord(result)) {
      throw new InternalServerErrorException();
    }
    const longestArticleLength = result.longest_article_length;
    const shortestArticleLength = result.shortest_article_length;
    return {
      longestArticleLength,
      shortestArticleLength,
    };
  }

  async getArticlesStatistics() {
    const result = await this.prismaService.article.aggregate({
      _avg: {
        upvotes: true,
      },
      _sum: {
        upvotes: true,
      },
      _max: {
        upvotes: true,
      },
    });

    const { longestArticleLength, shortestArticleLength } =
      await this.getArticlesLength();

    return {
      averageUpvotesCount: result._avg.upvotes,
      biggestUpvotesCount: result._max.upvotes,
      allUpvotesReceived: result._sum.upvotes,
      longestArticleLength,
      shortestArticleLength,
    };
  }
}
