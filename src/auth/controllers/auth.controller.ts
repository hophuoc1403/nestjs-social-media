import {
  Body,
  Controller,
  Post,
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

@Controller('api/auth')
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
}
