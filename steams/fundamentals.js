import { Readable, Writable } from 'node:stream'

//stream de leitura
class OneToHundredSteam extends Readable {
    index = 1;

    _read() {
        const i = this.index++;
        setTimeout(() => {

            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(i.toString())
                this.push(buf);
            }
        }, 1000)
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
    .pipe(new MultiplyByTenStream())