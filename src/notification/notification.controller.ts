import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get(':id')
  async getNotify(@Param('id', ParseIntPipe) userId: number) {
    return this.notificationService.getNotifications(userId);
  }
}
