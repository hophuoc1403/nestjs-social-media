import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Post('get-message')
  async getMessage(@Body('members') members: number[]) {
    return this.chatService.getMessages(members);
  }
}
