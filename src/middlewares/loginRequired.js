import jwt from 'jsonwebtoken';
import userModel from '../models/User';

export default async (req, res, next) => {
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

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        throw new Error(error.message);
      }

      const user = await userModel.findOne({ where: { email: decoded.email } });

      if (!user || !user.id) {
        throw new Error('Token invalid');
      }

      const checkUserEmail = await userModel.findOne({
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
