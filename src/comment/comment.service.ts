import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaError } from 'src/utils/prismaError';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(comment: CreateCommentDto) {
    try {
      return await this.prismaService.comment.create({
        data: {
          content: comment.content,
          articleId: comment.articleId,
          photoId: comment.photoId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientUnknownRequestError &&
        error.message.includes('check_if_only_one_is_not_null')
      ) {
        throw new BadRequestException(
          'You need to provide exactly one foreign key',
        );
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.ForeignKeyConstraintViolated
      ) {
        throw new BadRequestException(
          'You need to provide a foreign key that matches a valid row',
        );
      }
      throw error;
    }
  }
}
