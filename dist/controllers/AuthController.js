"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AuthService = require('../services/AuthService'); var _AuthService2 = _interopRequireDefault(_AuthService);

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await _AuthService2.default.loginService(email, password);
      return res.status(200).json({
        data: token,
      });
    } catch (error) {
      return res.status(400).json({ data: error.message });
    }
  }
}

exports. default = new AuthController();
