import jwt from 'jsonwebtoken';
import userModel from '../models/User';

class AuthService {
  async loginService(email, password) {
    if (!email || !password) {
      throw new Error('Send email and password');
    }

    const user = await userModel.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid email, there is no user with that email');
    }

    if (!(await user.passwordValid(password))) {
      throw new Error('Invalid password');
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.SECRET_JWT, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return { token };
  }
}

export default new AuthService();
