import md5 from 'md5';

/**
 * Based off this - https://gist.github.com/v1vendi/75d5e5dad7a2d1ef3fcb48234e4528cb
 */

function auth() {
    const ts = +new Date();
    const hash = md5(ts+process.env.MARVEL_PRIVATE_API_KEY+process.env.MARVEL_PUBLIC_API_KEY);
    return {
        ts,
        apikey: process.env.MARVEL_PUBLIC_API_KEY,
        hash
    }
}

function httpRequest(url, method, data) {
    const init = { method }
    switch (method) {
        case 'GET':
            url = `${url}?${new URLSearchParams({...data, ...auth()})}`;
            break
        case 'POST':
        case 'PUT':
        case 'PATCH':
            init.body = JSON.stringify(data)
    }
    return fetch(url, init).then((d) => d.json());
}

function generateAPI(url) {
    // a hack, so we can use field either as property or a method
    const callable = () => {};
    callable.url = url;

    return new Proxy(callable, { 
        get({ url }, propKey) {
            return (['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(propKey.toUpperCase())) 
                ? (data) => httpRequest(url, propKey.toUpperCase(), data) 
                : generateAPI(`${url}/${propKey}`);
        }, 
        apply({ url }, thisArg, [arg] = []) {
            return generateAPI( arg ? `${url}/${arg}` : url);
        }
    })
}

const marvelApi = generateAPI('http://gateway.marvel.com/v1/public');
export { marvelApi }