import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthGuard } from '../strategy/login.strategy';
import { UserFriendDto } from './dtos/userFriend.dto';
import { UserOptional } from '../types/user';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../config/multer.config';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/self-info')
  async getSelfInfo(@Request() req) {
    console.log(req);
    return this.userService.getUserInfo(req.user.id);
  }

  @Get(':id')
  async getUserInfo(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserInfo(id);
  }

  @UseGuards(AuthGuard)
  @Post('add-friend')
  @UsePipes(new ValidationPipe())
  async addFriend(@Body() payload: UserFriendDto) {
    return this.userService.addFriend(payload);
  }

  @UseGuards(AuthGuard)
  @Get('friends/:id')
  async getFriends(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getFriends({ userId });
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  async updateProfile(@Body() information: UserOptional, @Req() req) {
    return this.userService.updateProfile({ ...information, id: req.user.id });
  }

  @UseInterceptors(
    FileInterceptor('picturePath', {
      storage,
    }),
  )
  @UseGuards(AuthGuard)
  @Patch('update-avatar')
  async updateAvatar(@UploadedFile() picturePath, @Req() req) {
    return this.userService.updateAvatar({
      id: req.user.id,
      picturePath: picturePath.filename,
    });
  }
}
