export const buildRoutePath = (path) => {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '([a-z0-9\-+]+)')
    console.log(Array.from(path.matchAll(routeParametersRegex)))
}