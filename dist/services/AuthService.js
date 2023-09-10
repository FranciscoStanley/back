"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class AuthService {
  async loginService(email, password) {
    if (!email || !password) {
      throw new Error('Send email and password');
    }

    const user = await _User2.default.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid email, there is no user with that email');
    }

    if (!(await user.passwordValid(password))) {
      throw new Error('Invalid password');
    }
    const { id } = user;
    const token = _jsonwebtoken2.default.sign({ id, email }, process.env.SECRET_JWT, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return { token };
  }
}

exports. default = new AuthService();
