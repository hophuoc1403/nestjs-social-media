import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

export const fileFilter = (req, file, callback) => {
  const extension = extname(file.originalname);
  console.log(extension);
  if (!allowedExtensions.includes(extension)) {
    return callback(
      new BadRequestException(`File format ${extension} is not supported`),
      false,
    );
  }
  callback(null, true);
};

export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
