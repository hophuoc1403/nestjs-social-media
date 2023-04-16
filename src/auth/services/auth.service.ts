import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/User.entity';
import { Repository } from 'typeorm';
import { SignUpParams } from '../../types/auth.params';
import { hashPassword } from '../../utils/hashPassword';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../../constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userInformation: SignUpParams) {
    const ifExist = await this.userRepository.findOne({
      where: { email: userInformation.email },
    });
    if (ifExist) throw new BadRequestException('email already exist');
    const hashedPassword = await hashPassword(userInformation.password);
    const newUser = this.userRepository.save({
      ...userInformation,
      email: userInformation.email,
      password: hashedPassword,
      role: 'user',
    });
    return newUser;
  }

  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return { message: "account didn't exist" };
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException();
    }
    const { password: userPassword, ...payload } = user;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: '20m',
      }),
    };
  }
}
