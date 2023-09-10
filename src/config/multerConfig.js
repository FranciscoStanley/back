import multer from 'multer';
import { extname, resolve } from 'path';

const random = () => Math.floor(Math.random() * 1000 + 1000);

export default {
  fileFilter: (req, file, cb) => {
    const { mimetype } = file;
    if (
      mimetype !== 'image/png'
      && mimetype !== 'image/jpeg'
      && mimetype !== 'image/jpg'
    ) {
      return cb(
        new multer.MulterError(
          `File needs to be a png, jpeg or jpg. The file you send has type ${mimetype}`,
        ),
      );
    }
    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    },
  }),
};
