const { ObjectId } = require('mongodb');
class DeviceRepository {
    constructor(db) {
        this.collection = db.collection('devices');
    }

    async list(id) {
        const result = await this.collection.find({});
        return result.toArray();
    }

    async create(device) {
        const result = await this.collection.insertOne(device);
        return result;
    }

    async findById(id) {
        var result = this.collection.findOne({ _id: new ObjectId(id) })
        delete result._id
        return result
    }

    async update(id, device) {
        await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: device });
        return this.findById(id);
    }

    async delete(id) {
        await this.collection.deleteOne({ _id: new ObjectId(id) });
        return { message: 'Device deleted successfully' };
    }
}

module.exports = DeviceRepository;
