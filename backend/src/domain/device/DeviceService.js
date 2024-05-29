class DeviceService {
    constructor(deviceRepository) {
        this.deviceRepository = deviceRepository;
    }
    
    async getListDevice() {
        return this.deviceRepository.list();
    }

    async createDevice(device) {
        return this.deviceRepository.create(device);
    }

    async getDeviceById(id) {
        return this.deviceRepository.findById(id);
    }

    async updateDevice(id, device) {
        return this.deviceRepository.update(id, device);
    }

    async deleteDevice(id) {
        return this.deviceRepository.delete(id);
    }
}

module.exports = DeviceService;
