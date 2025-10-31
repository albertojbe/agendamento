const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

exports.hashPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};