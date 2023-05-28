import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from '../database/Notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  providers: [NotificationGateway, NotificationService],
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [NotificationController],
})
export class NotificationModule {}
