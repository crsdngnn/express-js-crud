import UserService from '../../services/userService.js';
import { validationResult } from 'express-validator';
import UserResourceCollection from './resources/userResourceCollection.js';
import userResourceObject from './resources/userResourceObject.js';

class UserController {
  
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      res.json(new userResourceObject(user));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await UserService.index();
      res.json(
        new UserResourceCollection(users)
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const user = await UserService.show(req.params.id);
      res.json(new userResourceObject(user));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const user = await UserService.update(req.params.id, req.body);
      res.json(new userResourceObject(user));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await UserService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await UserService.createUser(username, password);
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    
    const user = await UserService.findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = await UserService.generateToken(user);
    res.json({ token });
  }
}

export default new UserController();
