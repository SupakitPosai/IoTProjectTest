class UserRepository {
    constructor(db) {
        this.collection = db.collection('users');
    }

    async create(user) {
        const result = await this.collection.insertOne(user);
        return result;
    }

    async findByUsername(username) {
        return this.collection.findOne({ username });
    }
}

module.exports = UserRepository;
