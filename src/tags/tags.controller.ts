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
  Request,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AddTagDto } from './dtos/AddTag.dto';
import { AuthGuard } from 'src/strategy/login.strategy';

@UseGuards(AuthGuard)
@Controller('manage-tags')
export class ManageTagsController {
  constructor(private tagsService: TagsService) {}

  // @UseGuards(AdminGuard)
  @Get('')
  async getTags(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 5,
    @Request() req,
  ) {
    return this.tagsService.getTags({ page, limit });
  }

  @Post('')
  async addTags(@Body() tagInfo: AddTagDto) {
    return this.tagsService.addTags(tagInfo.name);
  }

  @Patch(':id')
  async updateTag(@Param('id', ParseIntPipe) id: number, @Body() tagInfo: any) {
    console.log('first');
    return this.tagsService.updateTag(id, tagInfo.name);
  }
}
