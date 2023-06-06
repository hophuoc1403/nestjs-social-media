import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/User.entity';
import { ManageAccountController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ManageAccountController],
  providers: [TagsService],
})
export class TagsModule {}
