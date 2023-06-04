import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '../strategy/login.strategy';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dtos/CreateStory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../config/multer.config';

@UseGuards(AuthGuard)
@Controller('story')
export class StoryController {
  constructor(private storyService: StoryService) {}

  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('picturePath', {
      storage,
    }),
  )
  @Post('/')
  async createStory(
    @UploadedFile() picturePath,
    @Body() story: CreateStoryDto,
  ) {
    return this.storyService.createStory(picturePath.filename, +story.userId);
  }

  @Get('')
  async getStories() {
    return this.storyService.getStories();
  }
}
