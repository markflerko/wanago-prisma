import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles.service';
import { ArticlesSearchParamsDto } from 'src/articles/dto/articles-search-params.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { CreatePostDto } from 'src/post/dto/createPost.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.articlesService.create(post, req.user);
  }

  @Get()
  getAll(@Query() searchParams: ArticlesSearchParamsDto) {
    return this.articlesService.search(searchParams);
  }
}
