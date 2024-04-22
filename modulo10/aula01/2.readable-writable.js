import { Readable, Writable } from 'stream';

// fonte de dados
const readable = Readable({
    read() {
        this.push('Hello World 1')
        this.push('Hello World 2')
        this.push('Hello World 3')

        // informa que os dados acabaram
        this.push(null)
    }
})

// saida de dados
const writeable = Writable({
    write(chunk, encoding, cb) {
        console.log(chunk.toString())

        cb()
    }
})

readable
    // writeable é sempre a saída -> imprimir, salvar, ignorar
    .pipe(writeable)
    // .pipe(process.stdout)