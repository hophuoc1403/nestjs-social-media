import {
  ArgumentsHost,
  Body,
  Catch,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dtos/signUp.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, storage } from '../../config/multer.config';
import { SignInDto } from '../dtos/signIn.dto';
import { ResetAccountDto, VerifyAccountDto } from '../dtos/verifyAccount.dto';
import { log } from 'console';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
);

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('picturePath', {
      storage,
      fileFilter,
    }),
  )
  @Post('sign-up')
  async signUp(@UploadedFile() picturePath, @Body() signupDto: SignUpDto) {
    return await this.authService.signUp({
      ...signupDto,
      picturePath: picturePath.filename,
    });
  }

  @Post('sign-in')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() payload: SignInDto) {
    // throw new HttpException('Test', HttpStatus.FORBIDDEN);
    return this.authService.signIn({ ...payload });
  }

  @Post('refresh')
  refreshToken(@Body('refreshToken') refreshToken: string, @Req() req) {
    return this.authService.refreshToken(req.user, refreshToken);
  }

  @Post('verify-account')
  handleVerifiAccount(@Body() accountInfo: VerifyAccountDto) {
    return this.authService.sendMail(accountInfo.email);
  }

  @Post('reset-password')
  handleResetPassword(@Body() resetDetail: ResetAccountDto) {
    return this.authService.resetPassword(
      resetDetail.token,
      resetDetail.password,
    );
  }

  catchHttpException(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const status = exception.getStatus();
    const message = exception.message;

    response.status(status).json({ message });
  }

  @Post('signin-with-sso')
  async signinWithSSO(@Body('token') token: string, @Req() req) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    console.log(ticket.getPayload());
    return this.authService.signInWithGoogle(ticket.getPayload(), req);
  }
}
