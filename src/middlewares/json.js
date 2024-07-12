//middlewares são interceptadores: é uma função para interceptar as requisições e fazem transformações, como transformar em JSON etc
//funções que interceptam e manupulam a requisição e a resposta de uma rota

export const json = async (req, res, next) => {
    const buffers = []
//chunk são pedaços de dados que são lidos e escritos em uma stream de forma assíncrona
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }
    res.setHeader('Content-type', 'application/json')
}