import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles.service';
import { ArticlesSearchParamsDto } from 'src/articles/dto/articles-search-params.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getAll(@Query() searchParams: ArticlesSearchParamsDto) {
    return this.articlesService.search(searchParams);
  }
}
