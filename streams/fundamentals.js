import { Readable, Writable, Transform } from 'node:stream'

//stream de leitura
class OneToHundredSteam extends Readable {
    index = 1;

    _read() {
        const i = this.index++;
        setTimeout(() => {

            if (i > 5) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf);
            }
        }, 1000)
    }
}

//stream de transformação, obrigatoriamente lê dados de um lugar e escrever dados para outro lugar, serve para comunicação entre streams
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}

//stream de escrita, processa os dados recebidos na stream de escrita, somente processa o dado e não transforma

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);
        callback()
    }
}
new OneToHundredSteam()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())