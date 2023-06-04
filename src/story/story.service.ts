import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoryEntity } from '../database/Story.entity';
import { LessThan, Repository } from 'typeorm';
import { UserEntity } from '../database/User.entity';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private storyRepository: Repository<StoryEntity>,
  ) {}

  async createStory(image: string, userId: number) {
    return this.storyRepository.save({ user: { id: userId }, image });
  }

  async getStories() {
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getTime() - 24 * 60 * 60 * 1000,
    ); // Lấy thời điểm 1 ngày trước

    const stories = await this.storyRepository
      .createQueryBuilder('story')
      .where('story.createdAt >= :expirationDate', { expirationDate })
      .leftJoinAndSelect('story.user', 'user')
      .getMany();

    const storiesGroupedByUser: { user: UserEntity; stories: StoryEntity[] }[] =
      [];

    stories.forEach((story) => {
      const existingUserIndex = storiesGroupedByUser.findIndex(
        (item) => item.user.id === story.user.id,
      );
      if (existingUserIndex !== -1) {
        storiesGroupedByUser[existingUserIndex].stories.push(story);
      } else {
        storiesGroupedByUser.push({ user: story.user, stories: [story] });
      }
    });

    return storiesGroupedByUser;
  }
}
