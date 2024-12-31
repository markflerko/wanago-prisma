import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { AuthorIdQueryDto } from 'src/post/dto/authorIdQuery.dto';
import { CreatePostDto } from 'src/post/dto/createPost.dto';
import { PaginationParamsDto } from 'src/post/dto/paginationParams.dto';
import { UpdatePostDto } from 'src/post/dto/updatePost.dto';
import { FindOneParams } from 'src/utils/findOneParams';
import { PostsService } from './posts.service';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(
    @Query() { authorId }: AuthorIdQueryDto,
    @Query() { offset, limit, startingId }: PaginationParamsDto,
  ) {
    if (authorId !== undefined) {
      return this.postsService.getPostsByAuthor(authorId, offset, limit);
    }
    return this.postsService.getPosts({ offset, limit, startingId });
    // return this.postsService.getPosts(offset, limit);
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }

  @Patch(':id')
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams) {
    return this.postsService.deletePost(Number(id));
  }
}
