const jwt = require('jsonwebtoken');
const userService = require('./userService');
const bcrypt = require('bcrypt');

const EXPIRE_TIME = '1h';


exports.generateToken = async function (userCredentials) {
  const { email, password } = userCredentials;

  const user = await userService.findUserByEmail(email);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Senha inválida');
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: EXPIRE_TIME });

  return token;
};

exports.verifyToken = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Token inválido ou expirado');
  }
};

// DTOs

exports.authDTO = function (data) {
  return {
    email: data.email,
    password: data.password
  };
}
