import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostDto } from './dtos/addPost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../config/multer.config';
import { AuthGuard } from '../strategy/login.strategy';
import { EditPostDto } from './dtos/EditPost.dto';

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
  async addPost(@UploadedFile() picturePath, @Body() post: AddPostDto) {
    return this.postService.addPost({ picturePath, ...post });
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
      console.log(picturePath);
      payload.postInfo.picturePath = picturePath.filename;
    }
    return this.postService.editPost(payload);
  }
}
