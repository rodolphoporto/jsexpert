import { writeFile, readFile } from 'fs/promises';

export const save = async (data) => {
    // nao tem __filename e __dirname
    const { pathname: databaseFile } = new URL('./../database.json', import.meta.url)
    console.log('databaseFile', databaseFile)
    const currentData = JSON.parse((await readFile(databaseFile)))
    currentData.push(data)

    await writeFile(databaseFile, JSON.stringify(currentData))
}