import MongoDB from 'mongodb';

export default class MongoDBStrategy {
    #instance
    constructor(connectString) {
      const { pathname: dbName } = new URL(connectString);
      this.connectString = connectString.replace(dbName, '');
      this.db = dbName.replace(/\W/, '');
      this.collection = "warriors"
    }
  
    async connect() {
      const client = new MongoDB.MongoClient(this.connectString, {
        useUnifiedTopology: true
      });
      await client.connect();
      const db = client.db(this.db).collection(this.collection);
      this.#instance = db;
    }
  
    async create(item) {
      return this.#instance.insertOne(item);
    }
  
    async read(item) {
      return this.#instance.find(item).toArray();
    }
}  