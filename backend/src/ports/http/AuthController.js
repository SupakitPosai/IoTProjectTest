const express = require('express');

class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.router = express.Router();
        this.routes();
    }

    routes() {
        this.router.post('/register', this.register.bind(this));
        this.router.post('/login', this.login.bind(this));
    }

    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await this.authService.register(username, email, password );
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await this.authService.login(username, password);
            res.status(200).json(token);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = AuthController;
