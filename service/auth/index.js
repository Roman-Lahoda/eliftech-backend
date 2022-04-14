import jwt from 'jsonwebtoken';
import repositoryUsers from '../../repository/auth/index.js';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async isUserExist(email) {
    const user = await repositoryUsers.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { email } = await repositoryUsers.create(body);
    return { email };
  }

  async getUser(email, password) {
    const user = await repositoryUsers.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8h' });
    return token;
  }

  async setToken(id, token) {
    await repositoryUsers.updateToken(id, token);
  }
}

export default AuthService;
