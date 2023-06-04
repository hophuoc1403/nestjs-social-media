import {
  ArgumentsHost,
  Body,
  Catch,
  Controller,
  HttpException,
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
    return this.authService.signIn({ ...payload });
  }

  @Post('refresh')
  refreshToken(@Body('refreshToken') refreshToken: string, @Req() req) {
    console.log(req.user);
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

  // @ts-ignore
  @Catch(HttpException)
  catchHttpException(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const status = exception.getStatus();
    const message = exception.message;

    response.status(status).json({ message });
  }
}
