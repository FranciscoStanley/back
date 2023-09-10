import photoModel from '../models/Photo';
import studentModel from '../models/Student';

class PhotoService {
  async uploadService(originalname, filename, studentId, error) {
    if (error) {
      throw new Error([error.code]);
    }

    const hasStudent = await studentModel.findByPk(studentId);

    if (!hasStudent) {
      throw new Error('student not found');
    }

    const photo = await photoModel.create({
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

    const hasStudent = await studentModel.findByPk(studentId);

    if (!hasStudent) {
      throw new Error('student not found');
    }

    await photoModel.update(
      { originalname, filename },
      { where: { student_id: hasStudent.id } },
    );

    return 'Updated completed successfuly';
  }
}

export default new PhotoService();
