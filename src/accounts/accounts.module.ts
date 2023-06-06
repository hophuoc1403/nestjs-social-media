import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/User.entity';
import { ManageAccountController } from './account.controller';
import { ManageAccountService } from './accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ManageAccountController],
  providers: [ManageAccountService],
})
export class AccountsModule {}
