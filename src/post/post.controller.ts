import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
import { AddCommentDto } from './dtos/AddComment.dto';
import { LikePostDto } from './dtos/LikePost.dto';

@UseGuards(AuthGuard)
@Controller('api/posts')
export class PostController {
  constructor(private postService: PostService) {}
  @Get('/')
  async getAllPost(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 5,
  ) {
    return this.postService.getAllPost({ limit, page });
  }

  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('picturePath', {
      storage,
    }),
  )
  @Post('/')
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

  @Delete('delete/:postId')
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
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
    const payload: any = { id, ...postInfo };
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

  @UsePipes(new ValidationPipe())
  @Post('comment')
  async addComment(@Body() comment: AddCommentDto, @Req() req) {
    return this.postService.addComment({ comment, userId: req.user.id });
  }

  @Get('comment/:postId')
  async getComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 5,
  ) {
    return this.postService.getComment({ postId, page, limit });
  }

  @Delete('comment/:id')
  async deleteComment(@Param('id', ParseIntPipe) commentId: number) {
    return this.postService.deleteComment({ commentId });
  }

  @Patch('comment/:id')
  async editComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Body() param: { content: string },
  ) {
    return this.postService.editComment({ commentId, content: param.content });
  }

  @UsePipes(new ValidationPipe())
  @Post('like')
  async likePost(@Body() post: LikePostDto, @Req() req) {
    return this.postService.likePost({
      postId: post.postId,
      userId: req.user.id,
    });
  }

  @Get('tags')
  async getTags() {
    return this.postService.getTags();
  }
  @Get('detail/:id')
  async getSpecificPost(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.getPostDetail(postId);
  }

  @Get(':id')
  async getUserPost(
    @Param('id', ParseIntPipe) userId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 5,
  ) {
    return this.postService.getUserPost(userId, { limit, page });
  }
}
