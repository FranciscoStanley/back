"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);

class PhotoService {
  async uploadService(originalname, filename, studentId, error) {
    if (error) {
      throw new Error([error.code]);
    }

    const hasStudent = await _Student2.default.findByPk(studentId);

    if (!hasStudent) {
      throw new Error('student not found');
    }

    const photo = await _Photo2.default.create({
      originalname,
      filename,
      studentId,
    });
    return photo;
  }

  async updatePhotoService(originalname, filename, studentId, error) {
    if (error) {
      throw new Error([error.code]);
    }

    const hasStudent = await _Student2.default.findByPk(studentId);

    if (!hasStudent) {
      throw new Error('student not found');
    }

    await _Photo2.default.update(
      { originalname, filename },
      { where: { student_id: hasStudent.id } },
    );

    return 'Updated completed successfuly';
  }
}

exports. default = new PhotoService();
