import { fork } from 'child_process'
import { setTimeout } from 'timers/promises'
import { createReadStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Writable} from 'stream'
import csvtojson from 'csvtojson'

const database = './data/All_Pokemon.csv'
const PROCESS_COUNT = 30
const replcations = []

const backGroundTaskFile = './src/backgroundTask.js'
const processes = new Map()
for (let index = 0; index < PROCESS_COUNT; index++) {
    const child = fork(backGroundTaskFile, [database])
    child.on('exit', () => {
        console.log(`child ${child.pid} exited`)
        processes.delete(child.pid)
    })

    // await setTimeout(200)
    // child.send('hello world')
    child.on('error', error => {
        console.log(`child ${child.pid} has an error`, error)
        process.exit(1)
    })

    child.on('message', msg => {
        // work around para multiprocessamento
        if (replcations.includes(msg)) return

        console.log(`${msg} is replicated!`)
        replcations.push(msg)
    })

    processes.set(child.pid, child)
}

function roundRobin(array, index=0) {
    return function() {
        if (index >= array.length) index = 0

        return array[index++]
    }
}
// Pool de conexoes ou load balancer
const getProcess = roundRobin([...processes.values()])
console.log(`starting with ${processes.size} processes`)
await setTimeout(100)

await pipeline(
    createReadStream(database),
    csvtojson(),
    Writable({
        write(chunk, encoding, callback) {
            const chosenProcess = getProcess()
            chosenProcess.send(JSON.parse(chunk))
            callback()
        }
    })
)

// for (let index = 0; index < 100; index++)
//     console.count(getProcess().pid)
