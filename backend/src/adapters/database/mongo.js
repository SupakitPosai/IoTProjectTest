const { MongoClient,ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

async function connectDB() {
    // const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const client = new MongoClient(process.env.MONGO_URI,{
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    await client.connect();
    
    // this.db = this.client.db(this.dbName);
    return client.db(process.env.DB_NAME);
}

module.exports = connectDB;
