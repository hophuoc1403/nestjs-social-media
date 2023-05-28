import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../database/Notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  async getNotifications(userId: number) {
    const response = await this.notificationRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'post'],
    });

    return { notifications: response };
  }
}
