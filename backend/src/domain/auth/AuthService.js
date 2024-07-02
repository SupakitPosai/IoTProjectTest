const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User.js');
const { DefaultError } = require('../../utils/errors.js');
const errors = require('../../utils/errors.js');

class AuthService {
    constructor(userRepository, jwtSecret) {
        this.userRepository = userRepository;
        this.jwtSecret = jwtSecret;
    }
    async test(username, email, password) {
        const user = await this.userRepository.findByUsername(username)
        if (user?.username == username) throw new DefaultError(errors.DUPLICATED_USERNAME);
        return { username, email, password }
    }
    async register(username, email, password) {
        if (!!!password || !!!username) throw new DefaultError(errors.INVALID_USERNAME_PASSWORD);
        if (!!!email) throw new DefaultError(errors.INVALID_EMAIL);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, email, hashedPassword);
        const userRes = await this.userRepository.findByUsername(user.username)
        if (userRes?.username == username) throw new DefaultError(errors.DUPLICATED_USERNAME);
        return this.userRepository.create(user);
    }

    async login(username, password) {
        const user = await this.userRepository.findByUsername(username);
        // if (!user) throw new DefaultError(errors.INVALID_USER);

        // const isValidPassword = await bcrypt.compare(password, user.password);
        // if (!isValidPassword) throw new DefaultError(errors.INVALID_PASSWORD);

        const token = jwt.sign({ id: user._id }, this.jwtSecret, { expiresIn: '1h' });
        return { token, expiresIn: 3600 };
    }
}

module.exports = AuthService;
