"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _StudentService = require('../services/StudentService'); var _StudentService2 = _interopRequireDefault(_StudentService);

class StudentController {
  async create(req, res) {
    try {
      const {
        name, surname, email, age, weight, height,
      } = req.body;
      const newStudent = await _StudentService2.default.createService(
        name,
        surname,
        email,
        age,
        weight,
        height,
      );
      res.status(201).json({
        data: newStudent,
      });
    } catch (error) {
      return res.status(400).json({
        data: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const students = await _StudentService2.default.getAllService();
      return res.status(200).json({
        data: students,
      });
    } catch (error) {
      return res.status(400).json({
        data: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const student = await _StudentService2.default.getByIdService(id);
      return res.status(200).json({
        data: student,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { userId, userEmail } = req;
      const { id } = req.params;
      const {
        name, surname, email, password,
      } = req.body;
      const updatedStudent = await _StudentService2.default.updateService(
        id,
        userId,
        userEmail,
        name,
        surname,
        email,
        password,
      );

      return res.status(200).json({
        data: ` ${updatedStudent} student updated successfully`,
      });
    } catch (error) {
      return res.status(400).json({
        data: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const student = await _StudentService2.default.deleteService(id);
      return res.status(200).json({
        data: `${student} student deleted successfuly`,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  }
}

exports. default = new StudentController();
