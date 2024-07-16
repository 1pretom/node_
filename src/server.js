import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


// query parameters: URL Stateful => filtros, paginação, não são informações obrigatórias
// ?userId=1 tem chave e valor, para iniciar mais, só colocar o & como no exemplo
// exemplo: http://localhost:3333/users?userId=1&name=Washington

// route parameters: serve para identificar um recurso, no exemplo está ifentificando um usuário
// metodo, recurso e route parameters
// exemplo: http://localhost:3333/users/1

//request body: serve para envio de informações de formulário, dá pra enviar quantas informações (HTTPs)
// exemplo: http://localhost:3333/users

// inicia o server http que irá lidar com as requisições HTTP

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })
    if (route) {
        const routeParams = req.url.match(route.path)
        req.params = { ...routeParams.groups }
        return route.handler(req, res)
    }
    return res.writeHead(404).end('not found')

})

server.listen(3333)