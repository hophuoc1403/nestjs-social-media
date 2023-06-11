import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/User.entity';
import { Repository } from 'typeorm';
import { UserFriendDto } from '../dtos/userFriend.dto';
import { UserFriendEntity } from '../../database/UserFriend.entity';
import { UserOptional } from '../../types/user';
import * as fs from 'fs';
import { TopicEntity } from '../../database/Topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
    @InjectRepository(UserFriendEntity)
    private userFriendRepository: Repository<UserFriendEntity>,
  ) {}

  async getTopic() {
    return this.topicRepository.find({});
  }
}
