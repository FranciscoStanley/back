import UserService from '../services/UserService';

class UserController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = await UserService.createService(name, email, password);
      return res.status(201).json({
        data: newUser,
      });
    } catch (error) {
      return res.status(400).json({ data: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await UserService.indexService();
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

      const user = await UserService.showService(id);
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

      const updateUser = await UserService.updateService(
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

      const userDeleted = await UserService.deleteService(userId, id);

      return res.status(200).json({
        data: ` ${userDeleted} user deleted successfully`,
      });
    } catch (error) {
      return res.status(400).json({ data: error.message });
    }
  }
}

export default new UserController();
