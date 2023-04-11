import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

export const fileFilter = (req, file, callback) => {
  const extension = extname(file.originalname);
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
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    callback(null, `${name}-${Date.now()}${fileExtName}`);
  },
});
