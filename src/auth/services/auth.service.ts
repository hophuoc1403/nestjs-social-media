import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (ifExist)
      throw new HttpException('email already exist', HttpStatus.BAD_REQUEST);
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
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['friends'],
    });
    if (!user) {
      return new HttpException("account didn't exist", HttpStatus.BAD_REQUEST);
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      throw new HttpException('not valid information', HttpStatus.BAD_REQUEST);
    }
    const { password: userPassword, ...payload } = user;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: '20m',
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: jwtConstants.refresh,
        expiresIn: '3d',
      }),
      user,
    };
  }

  async refreshToken(userInfo: any, refreshToken: string) {
    const verified = this.jwtService.verify(refreshToken, {
      secret: jwtConstants.refresh,
    });
    if (!verified)
      throw new HttpException('access denied', HttpStatus.BAD_REQUEST);

    const { iat, exp, ...info } = verified;
    return {
      access_token: this.jwtService.sign(info, {
        secret: jwtConstants.secret,
        expiresIn: '50m',
      }),
      refresh_token: this.jwtService.sign(info, {
        secret: jwtConstants.refresh,
        expiresIn: '3d',
      }),
    };
  }
}
