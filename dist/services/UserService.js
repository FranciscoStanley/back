"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserService {
  async createService(name, email, password) {
    const newUser = await _User2.default.create({
      name,
      email,
      password,
    });

    return newUser;
  }

  async indexService() {
    const users = await _User2.default.findAll({
      attributes: ['id', 'name', 'email'],
    });
    return users;
  }

  async showService(id) {
    const user = await _User2.default.findByPk(id, {
      attributes: ['id', 'name', 'email'],
    });
    return user;
  }

  async updateService(userId, name, email, password) {
    if (!name || !email || !password) {
      throw new Error('send at least one field to be changed');
    }

    if (!userId) {
      throw new Error('Invalid id');
    }

    const hasUser = await _User2.default.findByPk(userId);

    if (!hasUser) {
      throw new Error('User does not exist');
    }

    if (userId !== hasUser.id) {
      throw new Error('Not authorized');
    }

    const updateUser = await _User2.default.update(
      { name, email, password },
      { where: { id: hasUser.id } },
    );

    return updateUser;
  }

  async deleteService(userId, id) {
    if (!id) {
      throw new Error('Invalid id');
    }

    const hasUser = await _User2.default.findByPk(id);
    if (!hasUser) {
      throw new Error('User does not exist');
    }

    if (userId !== hasUser.id) {
      throw new Error('Not authorized');
    }

    const userDeleted = await _User2.default.destroy({
      where: {
        id: userId,
      },
    });

    return userDeleted;
  }
}

exports. default = new UserService();
