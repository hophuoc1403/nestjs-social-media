import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { UserEntity } from 'src/database/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageAccountService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async deleteAccount(id) {
    await this.userRepository.delete({ id });
    return 'delete success';
  }

  async getAccounts(payload: { page: number; limit: number }) {
    const userRes = await this.userRepository.createQueryBuilder('user');
    return paginate<UserEntity>(userRes, payload);
  }

  async inviteAdmin(id: number) {
    return this.userRepository.update({ id }, { role: 'admin' });
  }
}
