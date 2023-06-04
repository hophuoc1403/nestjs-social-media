import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryEntity } from '../database/Story.entity';
import { StoryController } from './story.controller';
import { AuthGuard } from 'src/strategy/login.strategy';
import { JwtService } from '@nestjs/jwt';
import { StoryService } from './story.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoryEntity])],
  controllers: [StoryController],
  providers: [JwtService, AuthGuard, StoryService],
})
export class StoryModule {}
