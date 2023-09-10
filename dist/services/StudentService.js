"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);

class StudentService {
  async createService(name, surname, email, age, weight, height) {
    const newStudent = await _Student2.default.create({
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
    const students = await _Student2.default.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'filename'],
      },
    });
    return students;
  }

  async getByIdService(id) {
    if (!id) {
      throw new Error('Send id');
    }

    const student = await _Student2.default.findByPk(id, {
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'filename'],
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }

  async updateService(id, userId, userEmail, name, surname, email, password) {
    const hasEmail = await _Student2.default.findOne({ where: { email } });

    if (hasEmail) {
      throw new Error('Email is already in use');
    }

    const hasStudent = await _Student2.default.findOne({
      where: { email: userEmail },
    });

    if (!hasStudent) {
      throw new Error('Student does not exist');
    }

    if (userId !== hasStudent.id && userId !== id) {
      throw new Error('Not authorized');
    }

    const student = await _Student2.default.update(
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

    const student = await _Student2.default.findByPk(id);

    if (student.id !== id) {
      throw new Error('Not authorized');
    }

    if (!student) {
      throw new Error('Student not found');
    }

    const studentDeleted = await _Student2.default.destroy({
      where: {
        id: student.id,
      },
    });

    return studentDeleted;
  }
}

exports. default = new StudentService();
