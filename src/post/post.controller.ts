import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostDto } from './dtos/AddPost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../config/multer.config';
import { AuthGuard } from '../strategy/login.strategy';
import { EditPostDto } from './dtos/EditPost.dto';
import { AddPostParams } from './@types/post.params';
import { SharePostDto } from './dtos/SharePost.dto';

@UseGuards(AuthGuard)
@Controller('api/post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get('/')
  async getAllPost() {
    return this.postService.getAllPost();
  }

  @UseInterceptors(
    FileInterceptor('picturePath', {
      storage,
    }),
  )
  @UsePipes(new ValidationPipe())
  @Post('add')
  async addPost(
    @UploadedFile() picturePath,
    @Body() post: AddPostDto,
    @Req() req,
  ) {
    const userId = req.user.id as number;
    const payload: AddPostParams = {
      userId,
      ...post,
    };
    if (picturePath) {
      payload.picturePath = picturePath.filename;
    }
    return this.postService.addPost(payload);
  }

  @Delete('delete')
  async deletePost(@Body('postId', ParseIntPipe) postId: number) {
    return this.postService.deletePost({ postId: postId });
  }

  @UseInterceptors(
    FileInterceptor('picturePath', {
      storage,
    }),
  )
  @UsePipes(new ValidationPipe())
  @Patch('update/:id')
  async editPost(
    @UploadedFile() picturePath,
    @Param('id', ParseIntPipe) id: number,
    @Body() postInfo: EditPostDto,
  ) {
    const payload: any = { id, postInfo };
    if (picturePath) {
      payload.postInfo.picturePath = picturePath.filename;
    }
    return this.postService.editPost(payload);
  }

  @UsePipes(new ValidationPipe())
  @Post('share')
  async sharePost(@Body() postInfo: SharePostDto, @Req() req) {
    return this.postService.sharePost({ postInfo, userId: req.user.id });
  }
}
