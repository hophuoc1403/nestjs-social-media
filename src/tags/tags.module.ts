import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageTagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TagEntity } from 'src/database/Tag.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [ManageTagsController],
  providers: [TagsService, JwtService],
})
export class TagsModule {}
