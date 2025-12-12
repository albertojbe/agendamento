const express = require('express');
const router = express.Router();

const AuthService = require('../services/AuthService');
const userRepository = require('../repositories/UserRepository');
const errorMiddleware = require('../middlewares/errorMiddleware');

const authServiceInstance = new AuthService(userRepository);

router.post('/token', async (req, res, next) => {
    try {
        const authDTO = { email: req.body.email, password: req.body.password };
        const token = await authServiceInstance.authenticate(authDTO);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
});

router.post('/validate', async (req, res, next) => {
    try {
        const payload = authServiceInstance.verifyToken(req.body.token);
        res.json({ user: payload });
    } catch (error) {
        next(error);
    }
});

router.use(errorMiddleware);

module.exports = router;
