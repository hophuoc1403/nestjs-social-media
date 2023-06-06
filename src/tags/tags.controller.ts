import { AdminGuard } from 'src/strategy/adminRole.strategy';
import { TagsService } from './tags.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AddTagDto } from './dtos/AddTag.dto';

@UseGuards(AdminGuard)
@Controller('manage-accounts')
export class ManageAccountController {
  constructor(private tagsService: TagsService) {}

  @Get('')
  async getTags(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 5,
  ) {
    return this.tagsService.getTags({ page, limit });
  }

  @Post('')
  async addTags(@Body() tagInfo: AddTagDto) {
    return this.tagsService.addTags(tagInfo.name);
  }
}
