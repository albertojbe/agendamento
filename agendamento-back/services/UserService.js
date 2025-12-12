const { hashPassword } = require('../utils/authUtils');
const erros = require('../errors');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(userDTO) {
        const existingUser = await this.userRepository.findByEmail(userDTO.email);
        if (existingUser) {
            throw new erros.ConflictError('Email já cadastrado');
        }
        userDTO.password = await hashPassword(userDTO.password);
        const newUser = await this.userRepository.create(userDTO);
        return newUser.toJSON();
    }

    async updateUser(id, userDTO) {
        const updatedUser = await this.userRepository.update(id, userDTO);
        if (!updatedUser) {
            throw new erros.NotFoundError('Usuário não encontrado');
        }
        return updatedUser.toJSON();
    }

    async deleteUser(id) {
        const deleted = await this.userRepository.delete(id);
        if (!deleted) {
            throw new erros.NotFoundError('Usuário não encontrado');
        }
        return deleted;
    }

    async findUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new erros.NotFoundError('Usuário não encontrado');
        }
        return user.toJSON();
    }

    async findUserByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new erros.NotFoundError('Usuário não encontrado');
        }
        return user.toJSON();
    }
}

module.exports = UserService;




