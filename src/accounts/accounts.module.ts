import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/User.entity';
import { ManageAccountController } from './account.controller';
import { ManageAccountService } from './accounts.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ManageAccountController],
  providers: [ManageAccountService, JwtService],
})
export class AccountsModule {}
