import fs from 'node:fs/promises'

//para direcionar onde o file de database deve ser salvo
const databasePath = new URL('../db.json', import.meta.url)
export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }
    select(table) {
        const data = this.#database[table] ?? []
        return data
    }
    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]

        }
        this.#persist()
        return data
    }
    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        //retorna -1 se não encontrar
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist
        }
    }
}