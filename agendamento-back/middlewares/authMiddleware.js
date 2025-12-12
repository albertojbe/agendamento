const AuthService = require('../services/AuthService');
const userRepository = require('../repositories/UserRepository');

const authServiceInstance = new AuthService(userRepository);

exports.validateJWT = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = authServiceInstance.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(error.statusCode || 403).json({ message: error.message });
  }
};