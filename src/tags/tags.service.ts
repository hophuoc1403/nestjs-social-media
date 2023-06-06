import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { TagEntity } from 'src/database/Tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async getTags(payload: Paginate) {
    const res = this.tagRepository.createQueryBuilder('tag');
    return paginate<TagEntity>(res, payload);
  }

  async addTags(name: string) {
    return this.tagRepository.save({ name });
  }
}
