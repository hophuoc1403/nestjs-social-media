import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/User.entity';
import { Repository } from 'typeorm';
import { SignUpParams } from '../../types/auth.params';
import { hashPassword } from '../../utils/hashPassword';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../../constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
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
      return HttpStatus.BAD_REQUEST;
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

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((error, token) => {
        if (error) {
          reject(error);
        }
        resolve(token);
      });
    });
    const config: any = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        accessToken,
      },
    };

    this.mailerService.addTransporter('gmail', config);
  }

  async sendMail(email: string) {
    const authenticationCode = this.jwtService.sign(
      { email },
      {
        secret: process.env.SECRET_AUTHENTICATION_CODE,
        expiresIn: '5m',
      },
    );

    await this.setTransport();
    this.mailerService
      .sendMail({
        transporterName: 'gmail',
        to: email,
        from: 'phuoc.anonydev2k3@gmail.com',
        subject: 'verify your  email',
        template: 'action',
        text: 'verify your  email',
        html: `<button><a href="http://localhost:3000/oauth-verify?token=${authenticationCode}">Verify Email</a></button>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async resetPassword(authenticationCode: string, password: string) {
    const verified = await this.jwtService.verify(authenticationCode, {
      secret: process.env.SECRET_AUTHENTICATION_CODE,
    });
    if (!verified) return HttpStatus.FORBIDDEN;
    const hashedPassword = await hashPassword(password);
    await this.userRepository.update(
      { email: verified.email },
      { password: hashedPassword },
    );
    return { message: 'reset password success !' };
  }
}
