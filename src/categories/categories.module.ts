import { Module } from '@nestjs/common';
import { PostsModule } from 'src/post/posts.module';
import { PrismaModule } from '../prisma/prisma.module';
import CategoriesController from './categories.controller';
import CategoriesService from './categories.service';

@Module({
  imports: [PrismaModule, PostsModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
