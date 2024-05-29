const express = require('express');

class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
        this.router = express.Router();
        this.routes();
    }

    routes() {
        this.router.get('/', this.getListDevice.bind(this));
        this.router.post('/', this.createDevice.bind(this));
        this.router.get('/:id', this.getDeviceById.bind(this));
        this.router.put('/:id', this.updateDevice.bind(this));
        this.router.delete('/:id', this.deleteDevice.bind(this));
    }
    async getListDevice(req, res) {
        try {
            const device = await this.deviceService.getListDevice();
            res.status(200).json(device);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createDevice(req, res) {
        try {
            const device = await this.deviceService.createDevice(req.body);
            res.status(201).json(device);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getDeviceById(req, res) {
        try {
            const device = await this.deviceService.getDeviceById(req.params.id);
            res.status(200).json(device);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateDevice(req, res) {
        try {
            const device = await this.deviceService.updateDevice(req.params.id, req.body);
            res.status(200).json(device);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteDevice(req, res) {
        try {
            const result = await this.deviceService.deleteDevice(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = DeviceController;
