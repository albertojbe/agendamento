const express = require('express');
const router = express.Router();

const UserService = require('../services/UserService');
const userRepository = require('../repositories/UserRepository');
const errorMiddleware = require('../middlewares/errorMiddleware');

const userServiceInstance = new UserService(userRepository);

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userServiceInstance.findUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const userDTO = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    const newUser = await userServiceInstance.createUser(userDTO);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const userDTO = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    const updatedUser = await userServiceInstance.updateUser(req.params.id, userDTO);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await userServiceInstance.deleteUser(req.params.id);
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    next(error);
  }
});

router.use(errorMiddleware);

module.exports = router;
