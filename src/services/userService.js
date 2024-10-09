import User from '../models/user.js';
import pkg from 'bcryptjs';
import jwtPkg from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/config.js';

const { jwt } = jwtPkg;
const { bcrypt } = pkg;

class UserService {
  async createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    return user.save();
  }

  async findUserByUsername(username) {
    return User.findOne({ username });
  }

  async generateToken(user) {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  }

  async create(data) {
    data.password = await bcrypt.hash(data.password, 10);
    const user = new User(data);
    return await user.save();
  }

  async index() {
    const users = await User.find();
    return users.map(User.toArray);
  }

  async show(id) {
    const user = await User.findById(id);
    return user ? User.toArray(user) : null;
  }

  async update(id, data) {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return updatedUser ? User.toArray(updatedUser) : null;
  }

  async delete(id) {
    const user = await User.findByIdAndDelete(id);
    return user ? User.toArray(user) : null;
  } 
}

export default new UserService();
