const express = require('express');
const cors = require('cors');
const connectDB = require('../adapters/database/mongo');
const UserRepository = require('../ports/repositories/UserRepository');
const DeviceRepository = require('../ports/repositories/DeviceRepository');
const AuthService = require('../domain/auth/AuthService');
const DeviceService = require('../domain/device/DeviceService');
const AuthController = require('../ports/http/AuthController');
const DeviceController = require('../ports/http/DeviceController');

async function createApp() {
    const app = express();
    app.use(cors({ origin: '*' }));
    app.use(express.urlencoded({ limit: '100mb', extended: true }));
    app.use(express.json({ limit: '100mb' }));

    const db = await connectDB();

    const userRepository = new UserRepository(db);
    const deviceRepository = new DeviceRepository(db);

    const authService = new AuthService(userRepository,process.env.JWT_SECRET);
    const deviceService = new DeviceService(deviceRepository);

    const authController = new AuthController(authService);
    const deviceController = new DeviceController(deviceService);

    app.use('/auth/v1', authController.router);
    app.use('/devices/v1', deviceController.router);

    return app;
}

module.exports = createApp;
