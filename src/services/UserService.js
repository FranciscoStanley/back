import userModel from '../models/User';

class UserService {
  async createService(name, email, password) {
    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    return newUser;
  }

  async indexService() {
    const users = await userModel.findAll({
      attributes: ['id', 'name', 'email'],
    });
    return users;
  }

  async showService(id) {
    const user = await userModel.findByPk(id, {
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

    const hasUser = await userModel.findByPk(userId);

    if (!hasUser) {
      throw new Error('User does not exist');
    }

    if (userId !== hasUser.id) {
      throw new Error('Not authorized');
    }

    const updateUser = await userModel.update(
      { name, email, password },
      { where: { id: hasUser.id } },
    );

    return updateUser;
  }

  async deleteService(userId, id) {
    if (!id) {
      throw new Error('Invalid id');
    }

    const hasUser = await userModel.findByPk(id);
    if (!hasUser) {
      throw new Error('User does not exist');
    }

    if (userId !== hasUser.id) {
      throw new Error('Not authorized');
    }

    const userDeleted = await userModel.destroy({
      where: {
        id: userId,
      },
    });

    return userDeleted;
  }
}

export default new UserService();
