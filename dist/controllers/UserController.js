"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _UserService = require('../services/UserService'); var _UserService2 = _interopRequireDefault(_UserService);

class UserController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = await _UserService2.default.createService(name, email, password);
      return res.status(201).json({
        data: newUser,
      });
    } catch (error) {
      return res.status(400).json({ data: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await _UserService2.default.indexService();
      return res.status(200).json({
        data: users,
      });
    } catch (error) {
      return res.status(400).json({ data: error.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await _UserService2.default.showService(id);
      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      return res.status(400).json({ data: error.message });
    }
  }

  async update(req, res) {
    try {
      const { userId } = req;
      const { name, email, password } = req.body;

      const updateUser = await _UserService2.default.updateService(
        userId,
        name,
        email,
        password,
      );

      return res.status(200).json({
        data: ` ${updateUser} user updated Successfully`,
      });
    } catch (error) {
      return res.status(400).json({ data: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { userId } = req;
      const { id } = req.params;

      const userDeleted = await _UserService2.default.deleteService(userId, id);

      return res.status(200).json({
        data: ` ${userDeleted} user deleted successfully`,
      });
    } catch (error) {
      return res.status(400).json({ data: error.message });
    }
  }
}

exports. default = new UserController();
