import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
  }
}
