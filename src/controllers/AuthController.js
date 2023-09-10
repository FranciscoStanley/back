import authService from '../services/AuthService';

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await authService.loginService(email, password);
      return res.status(200).json({
        data: token,
      });
    } catch (error) {
      return res.status(400).json({ data: error.message });
    }
  }
}

export default new AuthController();
