import { createServer } from 'http'
import { parse, fileURLToPath } from 'url'
import { Worker } from 'worker_threads'

// https://sharp.pixelplumbing.com/install#worker-threads
import sharp from 'sharp'

import { dirname } from 'path'

const currentFolder = dirname(fileURLToPath(import.meta.url))
const workrFileName = 'worker.js'
async function joinImages(images) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`${currentFolder}/${workrFileName}`)
        worker.postMessage(images)
        worker.once('message', resolve)
        worker.once('error', reject)
        worker.once('exit', code => {
            if (code !== 0) {
                reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`))
            }
            console.log(`the thread ${worker.threadId} exited!`)
        })
    })
}

async function handler(request, response) {
    if (request.url.includes('joinImages')) {
        const { query: { background, img } } = parse(request.url, true)
        const imageBase64 = await joinImages({
            image: img,

            background
        })

        response.writeHead(200, 
            { 'Content-Type': 'text/html' }
        )

        response.end(`<img style"width:100%;height:100%" src="data:image/jpeg;base64,${imageBase64}" />`)
        return
    }

    return response.end('ok')
}

createServer(handler)
    .listen(3000, () => console.log('running at 3000'))

// localhost:3000/joinImages?img=https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png&background=https://wallpaperaccess.com/full/3057585.jpg

// https://images.vexels.com/media/users/3/315587/isolated/preview/4c6c456e8b30ec39bd0e71bfb221d471-adora-vel-gatinho-comendo-um-pirulito-no-halloween.png
// https://images.vexels.com/media/users/3/227427/isolated/preview/4de4e13d06827b98c578fa30f9349ec4-flat-gatinho-fofo.png

// backgrounds
// https://img.freepik.com/fotos-premium/fundo-pos-apocaliptico-da-cidade-edificios-destruidos_953425-2249.jpg
// https://wallpapercave.com/wp/wp1822815.jpg