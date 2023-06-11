import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TopicService } from './services/topic.service';
import { AuthGuard } from '../strategy/login.strategy';

@Controller('topics')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getTopic(@Request() req) {
    return this.topicService.getTopic();
  }
}
