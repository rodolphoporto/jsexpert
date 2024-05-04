import { parentPort } from 'worker_threads'
import sharp from 'sharp'
import axios from 'axios'

async function downloadImage(url) {
    const response = await axios.get(url, {
        responseType: 'arraybuffer'
    })

    return response.data
}

async function onMessage({ image, background }) {
    const firstLayer = await sharp(await downloadImage(image))
        // .grayscale()
        // .rotate(90)
        .toBuffer()

    const secondLayer = await sharp(await downloadImage(background))
        .composite(
            [
                {input: firstLayer, gravity: sharp.gravity.south}
            ]
        )
        .toBuffer()

    parentPort.postMessage(secondLayer.toString('base64'))
}

parentPort.on('message', onMessage)