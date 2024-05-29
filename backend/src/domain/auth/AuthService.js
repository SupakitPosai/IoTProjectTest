const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User.js');

class AuthService {
    constructor(userRepository, jwtSecret) {
        this.userRepository = userRepository;
        this.jwtSecret = jwtSecret;
    }

    async register(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, email, hashedPassword);
        return this.userRepository.create(user);
    }

    async login(username, password) {
        const user = await this.userRepository.findByUsername(username);
        if (!user) throw new Error('User not found');

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error('Invalid password');

        const token = jwt.sign({ id: user._id }, this.jwtSecret, { expiresIn: '1h' });
        return { token,expiresIn:3600 };
    }
}

module.exports = AuthService;
