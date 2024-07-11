//middlewares são interceptadores: é uma função para interceptar as requisições e fazem transformações, como transformar em JSON etc

export const json = async (req, res, next) => {
    const buffers = []

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