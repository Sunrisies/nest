import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}
  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    // console.log(content, 'content');
    const { title, content, author, images } = createArticleDto;
    const article = this.articleRepository.create({
      title,
      content,
      author,
      images,
    });
    return this.articleRepository.save(article);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article> {
    return await this.articleRepository.find({ where: { id: id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
