import multer from 'multer';

import multerConfig from '../config/multerConfig';
import photoService from '../services/PhotosService';

const upload = multer(multerConfig).single('file');

class PhotoController {
  async upload(req, res) {
    try {
      return upload(req, res, async (error) => {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        const photo = await photoService.uploadService(
          originalname,
          filename,
          student_id,
          error,
        );
        return res.status(200).json({
          data: photo,
        });
      });
    } catch (error) {
      return res.status(400).json({
        data: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      return upload(req, res, async (error) => {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        const updatePhoto = await photoService.updatePhotoService(
          originalname,
          filename,
          student_id,
          error,
        );
        res.status(200).json({
          data: updatePhoto,
        });
      });
    } catch (error) {
      return res.status(400).json({
        data: error.message,
      });
    }
  }
}

export default new PhotoController();
