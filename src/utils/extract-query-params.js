// ['search=Washington', 'page=1']
// ['search', 'Washington'] isso é o que o primeiro split faz
// ['page', '2']

export const extractQueryParams = (query) => {
    return query.substr(1).split('&').reduce((queryParams, para) => {
        const [key, value] = para.split('=')
        queryParams[key] = value
        return queryParams
    })
}