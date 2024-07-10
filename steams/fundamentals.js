import { Readable } from 'node:stream'
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

new OneToHundredSteam().pipe(process.stdout)