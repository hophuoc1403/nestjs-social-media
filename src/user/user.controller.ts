// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   ParseIntPipe,
//   Post,
//   Request,
//   UploadedFile,
//   UseGuards,
//   UseInterceptors,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';
// import { UserService } from './services/user.service';
// import { AuthGuard } from '../strategy/login.strategy';
// import { UserFriendDto } from './dtos/userFriend.dto';
// import { UserOptional } from '../types/user';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { storage } from '../config/multer.config';
//
// @Controller('api/users')
// export class UserController {
//   constructor(private userService: UserService) {}
//
//   @UseGuards(AuthGuard)
//   @Get('/self-info')
//   async getSelfInfo(@Request() req) {
//     return this.userService.getUserInfo(req.user.id);
//   }
//
//   @Get(':id')
//   async getUserInfo(@Param('id', ParseIntPipe) id: number) {
//     return this.userService.getUserInfo(id);
//   }
//
//   @UseGuards(AuthGuard)
//   @Post('add-friend')
//   @UsePipes(new ValidationPipe())
//   async addFriend(@Body() payload: UserFriendDto) {
//     return this.userService.addFriend(payload);
//   }
//
//   @UseGuards(AuthGuard)
//   @Get('friends/:id')
//   async getFriends(@Param('id', ParseIntPipe) userId: number) {
//     return this.userService.getFriends({ userId });
//   }
//
//   @UseGuards(AuthGuard)
//   @Get('update')
//   async updateProfile(@Body() information: UserOptional) {
//     return this.userService.updateProfile(information);
//   }
//
//   @UseInterceptors(
//     FileInterceptor('picturePath', {
//       storage,
//     }),
//   )
//   @UseGuards(AuthGuard)
//   @Get('update-avatar')
//   async updateAvatar(@UploadedFile() picturePath) {
//     return this.userService.updateAvatar(picturePath.filename);
//   }
// }
