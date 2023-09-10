import Photo from '../models/Photo';
import studentModel from '../models/Student';

class StudentService {
  async createService(name, surname, email, age, weight, height) {
    const newStudent = await studentModel.create({
      name,
      surname,
      email,
      age,
      weight,
      height,
    });
    return newStudent;
  }

  async getAllService() {
    const students = await studentModel.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename'],
      },
    });
    return students;
  }

  async getByIdService(id) {
    if (!id) {
      throw new Error('Send id');
    }

    const student = await studentModel.findByPk(id, {
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename'],
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }

  async updateService(id, userId, userEmail, name, surname, email, password) {
    const hasEmail = await studentModel.findOne({ where: { email } });

    if (hasEmail) {
      throw new Error('Email is already in use');
    }

    const hasStudent = await studentModel.findOne({
      where: { email: userEmail },
    });

    if (!hasStudent) {
      throw new Error('Student does not exist');
    }

    if (userId !== hasStudent.id && userId !== id) {
      throw new Error('Not authorized');
    }

    const student = await studentModel.update(
      {
        name,
        surname,
        email,
        password,
      },
      { where: { id: hasStudent.id } },
    );
    return student;
  }

  async deleteService(id) {
    if (!id) {
      throw new Error('Send id');
    }

    const student = await studentModel.findByPk(id);

    if (student.id !== id) {
      throw new Error('Not authorized');
    }

    if (!student) {
      throw new Error('Student not found');
    }

    const studentDeleted = await studentModel.destroy({
      where: {
        id: student.id,
      },
    });

    return studentDeleted;
  }
}

export default new StudentService();
