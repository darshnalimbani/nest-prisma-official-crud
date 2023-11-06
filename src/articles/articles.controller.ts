import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';


@Controller('articles')
@ApiTags('articles')
@UseFilters(PrismaClientExceptionFilter)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  findDrafts() {
    return this.articlesService.findDrafts();
  }

// Used ParseInt 
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {

    const article = await this.articlesService.findOne(id);
    if(!article){
      throw new NotFoundException(`Article with id ${id} not found.`);
    }
    return article;
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
