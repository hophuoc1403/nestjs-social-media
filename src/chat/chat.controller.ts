import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Post('get-message')
  async getMessage(@Body('members') members: number[]) {
    return this.chatService.getMessages(members);
  }

  @Get('get-message-titles/:userId')
  async getMessageWithTitles(@Param('userId', ParseIntPipe) userId: number) {
    return this.chatService.getMessageWithTitle(userId);
  }
}
