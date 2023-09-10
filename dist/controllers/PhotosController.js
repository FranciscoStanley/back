"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _PhotosService = require('../services/PhotosService'); var _PhotosService2 = _interopRequireDefault(_PhotosService);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('file');

class PhotoController {
  async upload(req, res) {
    try {
      return upload(req, res, async (error) => {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        const photo = await _PhotosService2.default.uploadService(
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

        const updatePhoto = await _PhotosService2.default.updatePhotoService(
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

exports. default = new PhotoController();
