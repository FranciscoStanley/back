"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('The token was not informed!');
    }

    if (!authorization) {
      throw new Error('Unauthorized, login required');
    }

    const [text, token] = authorization.split(' ');

    if (!/^Bearer$/i.test(text)) {
      throw new Error('Malformatted Token!');
    }

    _jsonwebtoken2.default.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        throw new Error(error.message);
      }

      const user = await _User2.default.findOne({ where: { email: decoded.email } });

      if (!user || !user.id) {
        throw new Error('Token invalid');
      }

      const checkUserEmail = await _User2.default.findOne({
        where: {
          id: user.id,
          email: user.email,
        },
      });

      if (!checkUserEmail) {
        throw new Error('User invalid');
      }

      req.userId = user.id;
      req.userEmail = user.email;
      return next();
    });
  } catch (error) {
    return res.status(401).json({
      data: error,
    });
  }
};
