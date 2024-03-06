import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStrategy.js"

const postgresConnectionString = "postgres://rporto:senha0001@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect();

const mongoDBConnectionString = "mongodb://rporto:senha0001@localhost:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongoDBContext.connect();

const data = [{
    name: 'rodolphoporto',
    type: 'transaction'
}, {
    name: 'valzinha',
    type: 'activityLog'
}]

const contextType = {
    transaction: postgresContext,
    activityLog: mongoDBContext
}

for (const { name, type } of data) {
    const context = contextType[type]
    await context.create({ name: name + Date.now() })
    
    console.log(type, context.dbStrategy.constructor.name)
    console.log(await context.read())
}

// await mongoDBContext.create({ name: data[1].name} );
// console.log(await mongoDBContext.read());