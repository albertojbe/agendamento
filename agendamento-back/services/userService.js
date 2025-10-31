const User = require('../models/userModel');
const { hashPassword } = require('./authService');

const SALT_ROUNDS = 10;

exports.createUser = async function(userDTO) {
    try {
        const hashedPassword = await bcrypt.hash(userDTO.password, SALT_ROUNDS);
        userDTO.password = hashedPassword;
        return (await User.create(userDTO)).toJSON();
    } catch(error) {
        throw new Error('Erro ao cadastrar usuário: ' + error.message)
    }
}

exports.updateUser = async function(id, userDTO) {
    try {
        await User.update(userDTO, { where: { id: id } });
        const updatedUser = await User.findByPk(id);
        return updatedUser ? updatedUser.toJSON() : null;
    } catch(error) {
        throw new Error('Erro ao atualizar usuário: ' + error.message)
    }
}

exports.deleteUser = async function(id) {
    try {
        const deleted = await User.destroy({ where: { id: id } });
        return deleted > 0;
    } catch(error) {
        throw new Error('Erro ao deletar usuário: ' + error.message)
    }
}

exports.findUserById = async function(id) {
    try {
        const user = await User.findByPk(id);
        return user ? user.toJSON() : null;
    } catch(error) {
        throw new Error('Erro ao buscar usuário: ' + error.message)
    }
}

exports.findUserByEmail = async function(email) {
    try {
        const user = await User.findOne({ where: { email: email } })
        return user ? user.toJSON() : null;
    } catch(error) {
        throw new Error('Erro ao buscar usuário: ' + error.message)
    }
}


exports.createUserDTO = function(userData) {
    return {
        name: userData.name,
        email: userData.email,
        password: userData.password
    }
}

exports.simpleUserDTO = function(userData) {
    return {
        name: userData.name,
        email: userData.email
    }
}





