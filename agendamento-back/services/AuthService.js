const erros = require('../errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const EXPIRE_TIME = '1h';

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async authenticate(authDTO) {
        const { email, password } = authDTO;

        const user = await this.userRepository.findByEmail(email);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch || !user) {
            throw new erros.UnauthorizedError('Usuário ou senha inválidos');
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: EXPIRE_TIME });
        return token;
    }

    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (err) {
            throw new erros.UnauthorizedError('Token inválido ou expirado');
        }
    }

}

module.exports = AuthService;
