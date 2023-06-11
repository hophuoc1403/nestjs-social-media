import { AdminGuard } from 'src/strategy/adminRole.strategy';
import { ManageAccountService } from './accounts.service';
import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/strategy/login.strategy';

@UseGuards(AuthGuard)
@UseGuards(AdminGuard)
@Controller('manage-accounts')
export class ManageAccountController {
  constructor(private manageAccountService: ManageAccountService) {}

  @Delete('delete/:id')
  async deleteAccount(@Param('id', ParseIntPipe) id: number) {
    return this.manageAccountService.deleteAccount(id);
  }

  @Get('')
  async getAccounts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 5,
  ) {
    return this.manageAccountService.getAccounts({ page, limit });
  }

  @Get('invite-admin/:id')
  async inviteAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.manageAccountService.inviteAdmin(id);
  }
}
