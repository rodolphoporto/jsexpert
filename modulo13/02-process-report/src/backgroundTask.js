import { createReadStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Writable, Transform } from 'stream'
import csvtojson from 'csvtojson'
import { setTimeout } from 'timers/promises'

const database = process.argv[2]

async function onMessage(msg) {
    const firstTimeRan = []

    await pipeline(
        createReadStream(database),
        csvtojson(),
        Transform({
            transform(chunk, encoding, callback) {
                const data = JSON.parse(chunk)
                if (data.Name !== msg.Name) return callback()
                
                if (firstTimeRan.includes(data.Name)) {
                    return callback(null, msg.Name)
                }

                firstTimeRan.push(data.Name)
                callback()
            }
        }),
        Writable({
            write(chunk, encoding, callback) {
                if(!chunk) return callback()

                process.send(chunk.toString())
                
                callback()
            }
        })
    )
}

process.on('message', onMessage)

// console.log(`I'm ready!! ${process.pid}`, database)

// para falar que os sub processos pode morrer após inatividade
await setTimeout(10000)
process.channel.unref()